/**
 * Supabase Client & Realtime Sync Service for Plaisirs & Saveurs HACCP
 * Strictly isolated tables with prefix: ps_haccp_* (Zero collision with other projects)
 */

import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type {
  TemperatureTarget,
  TemperatureRecord,
  GoodsReceipt,
  SecondaryDlcItem,
  CleaningTask,
} from '../types';

const STORAGE_SUPABASE_URL_KEY = 'haccp_supabase_url';
const STORAGE_SUPABASE_KEY_KEY = 'haccp_supabase_anon_key';
const DEFAULT_SUPABASE_URL = 'https://hsylnrzxeyqxczdalurj.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzeWxucnp4ZXlxeGN6ZGFsdXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODIzMDksImV4cCI6MjA4MTQ1ODMwOX0.LmDeLvw6vHO7mjHi2qWeWwIEaNDutZ1spsahUGxEAnc';

export const getSupabaseConfig = (): { url: string; anonKey: string } => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const storedUrl = localStorage.getItem(STORAGE_SUPABASE_URL_KEY) || envUrl || DEFAULT_SUPABASE_URL;
  const storedKey = localStorage.getItem(STORAGE_SUPABASE_KEY_KEY) || envKey || DEFAULT_SUPABASE_ANON_KEY;

  return {
    url: storedUrl.trim(),
    anonKey: storedKey.trim(),
  };
};

export const saveSupabaseConfig = (url: string, anonKey: string): void => {
  localStorage.setItem(STORAGE_SUPABASE_URL_KEY, url.trim());
  localStorage.setItem(STORAGE_SUPABASE_KEY_KEY, anonKey.trim());
  supabaseInstance = null;
};

export const isSupabaseConfigured = (): boolean => {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey && config.url.startsWith('http'));
};

let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseInstance) return supabaseInstance;

  const { url, anonKey } = getSupabaseConfig();
  if (url && anonKey && url.startsWith('http')) {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return supabaseInstance;
    } catch (e) {
      console.error('[Supabase] Init error:', e);
      return null;
    }
  }

  return null;
};

/**
 * Uploads a base64 photo to dedicated Supabase Storage bucket 'ps-haccp-photos'
 */
export const uploadPhotoToSupabase = async (
  base64DataUrl: string,
  fileNamePrefix: string = 'photo',
  bucketName: string = 'ps-haccp-photos'
): Promise<string> => {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return base64DataUrl;
  }

  try {
    const res = await fetch(base64DataUrl);
    const blob = await res.blob();
    const extension = blob.type.split('/')[1] || 'jpg';
    const filePath = `plaisirs_saveurs/${fileNamePrefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, blob, {
        contentType: blob.type,
        upsert: true,
      });

    if (uploadError) {
      console.warn('[Supabase Storage] Upload warning:', uploadError.message);
      return base64DataUrl;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl || base64DataUrl;
  } catch (err) {
    console.warn('[Supabase Storage] Catch warning:', err);
    return base64DataUrl;
  }
};

/**
 * Real-time Supabase Database Sync for all Plaisirs & Saveurs tables
 */
export const subscribeToSupabaseRealtime = (
  onRemoteChange: () => void
): (() => void) => {
  const supabase = getSupabaseClient();
  if (!supabase) return () => {};

  const channel = supabase
    .channel('ps_haccp_realtime_channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ps_haccp_targets' }, () => onRemoteChange())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ps_haccp_records' }, () => onRemoteChange())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ps_haccp_receipts' }, () => onRemoteChange())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ps_haccp_secondary_dlc' }, () => onRemoteChange())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'ps_haccp_cleaning_tasks' }, () => onRemoteChange())
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

/**
 * Fetch all data from Supabase tables
 */
export const fetchAllFromSupabase = async (): Promise<{
  targets?: TemperatureTarget[];
  records?: TemperatureRecord[];
  receipts?: GoodsReceipt[];
  secondaryDlc?: SecondaryDlcItem[];
  cleaningTasks?: CleaningTask[];
} | null> => {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const [targetsRes, recordsRes, receiptsRes, dlcRes, cleaningRes] = await Promise.all([
      supabase.from('ps_haccp_targets').select('*'),
      supabase.from('ps_haccp_records').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('ps_haccp_receipts').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('ps_haccp_secondary_dlc').select('*').order('created_at', { ascending: false }).limit(100),
      supabase.from('ps_haccp_cleaning_tasks').select('*'),
    ]);

    const mappedTargets: TemperatureTarget[] = (targetsRes.data || []).map((t) => ({
      id: t.id,
      name: t.name,
      type: t.type,
      zone: t.zone || 'Fournil',
      minTemp: Number(t.min_temp),
      maxTemp: Number(t.max_temp),
      currentTemp: t.current_temp !== null ? Number(t.current_temp) : undefined,
      photoUrl: t.photo_url || undefined,
      lastChecked: t.last_checked || undefined,
      status: t.current_temp === undefined ? 'non_verifie' : (t.current_temp >= t.min_temp && t.current_temp <= t.max_temp ? 'conforme' : 'alerte'),
    }));

    const mappedRecords: TemperatureRecord[] = (recordsRes.data || []).map((r) => ({
      id: r.id,
      targetId: r.target_id,
      targetName: r.target_name,
      value: Number(r.temp_value),
      minTemp: r.min_allowed !== null ? Number(r.min_allowed) : 0,
      maxTemp: r.max_allowed !== null ? Number(r.max_allowed) : 4,
      status: r.status === 'alerte' ? 'alerte' : 'conforme',
      timestamp: r.recorded_at,
      userId: r.user_id || 'usr_01',
      userName: r.operator_name || 'Sophie',
      period: r.period || 'Matin',
      correctiveAction: r.notes || undefined,
    }));

    const mappedReceipts: GoodsReceipt[] = (receiptsRes.data || []).map((r) => ({
      id: r.id,
      supplier: r.supplier,
      category: r.category,
      truckTemp: r.truck_temp !== null ? Number(r.truck_temp) : undefined,
      isTempCompliant: r.is_temp_compliant,
      isPackageIntact: r.is_package_intact,
      timestamp: r.timestamp,
      receivedBy: r.received_by,
      invoicePhotoUrl: r.invoice_photo_url || undefined,
      goodsPhotoUrl: r.goods_photo_url || undefined,
      photoUrl: r.invoice_photo_url || r.goods_photo_url || undefined,
      status: r.status,
      notes: r.notes || undefined,
    }));

    const mappedDlc: SecondaryDlcItem[] = (dlcRes.data || []).map((d) => ({
      id: d.id,
      productName: d.product_name,
      category: d.category,
      prepDate: d.prep_date,
      durationHours: Number(d.duration_hours),
      expiryDate: d.expiry_date,
      preparedBy: d.prepared_by,
      storageTemp: d.storage_temp || '+2°C à +4°C',
      notes: d.notes || undefined,
    }));

    const mappedCleaning: CleaningTask[] = (cleaningRes.data || []).map((c) => ({
      id: c.id,
      name: c.name,
      zone: c.zone,
      frequency: c.frequency,
      period: c.period || undefined,
      completed: c.completed,
      completedAt: c.completed_at || undefined,
      completedBy: c.completed_by || undefined,
      instructions: c.instructions || undefined,
    }));

    return {
      targets: mappedTargets,
      records: mappedRecords,
      receipts: mappedReceipts,
      secondaryDlc: mappedDlc,
      cleaningTasks: mappedCleaning,
    };
  } catch (err) {
    console.error('[Supabase] fetch error:', err);
    return null;
  }
};

/**
 * Push all local data to Supabase
 */
export const pushAllToSupabase = async (data: {
  targets?: TemperatureTarget[];
  records?: TemperatureRecord[];
  receipts?: GoodsReceipt[];
  secondaryDlc?: SecondaryDlcItem[];
  cleaningTasks?: CleaningTask[];
}): Promise<boolean> => {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    if (data.targets && data.targets.length > 0) {
      const rows = data.targets.map((t) => ({
        id: t.id,
        name: t.name,
        type: t.type,
        zone: t.zone || 'Fournil',
        min_temp: t.minTemp,
        max_temp: t.maxTemp,
        current_temp: t.currentTemp ?? null,
        photo_url: t.photoUrl ?? null,
        last_checked: t.lastChecked ?? null,
      }));
      await supabase.from('ps_haccp_targets').upsert(rows);
    }

    if (data.records && data.records.length > 0) {
      const rows = data.records.map((r) => ({
        id: r.id,
        target_id: r.targetId,
        target_name: r.targetName,
        temp_value: r.value,
        min_allowed: r.minTemp,
        max_allowed: r.maxTemp,
        is_compliant: r.status === 'conforme',
        recorded_at: r.timestamp,
        operator_name: r.userName,
        status: r.status,
        notes: r.correctiveAction ?? null,
      }));
      await supabase.from('ps_haccp_records').upsert(rows);
    }

    if (data.receipts && data.receipts.length > 0) {
      const rows = data.receipts.map((r) => ({
        id: r.id,
        supplier: r.supplier,
        category: r.category || 'Courses / Marchandises',
        truck_temp: r.truckTemp ?? null,
        is_temp_compliant: r.isTempCompliant ?? true,
        is_package_intact: r.isPackageIntact ?? true,
        timestamp: r.timestamp,
        received_by: r.receivedBy || 'Utilisateur',
        invoice_photo_url: r.invoicePhotoUrl ?? null,
        goods_photo_url: r.goodsPhotoUrl ?? null,
        status: r.status,
        notes: r.notes ?? null,
      }));
      await supabase.from('ps_haccp_receipts').upsert(rows);
    }

    if (data.secondaryDlc && data.secondaryDlc.length > 0) {
      const rows = data.secondaryDlc.map((d) => ({
        id: d.id,
        product_name: d.productName,
        category: d.category,
        prep_date: d.prepDate,
        duration_hours: d.durationHours,
        expiry_date: d.expiryDate,
        prepared_by: d.preparedBy,
        storage_temp: d.storageTemp ?? '+2°C à +4°C',
        notes: d.notes ?? null,
      }));
      await supabase.from('ps_haccp_secondary_dlc').upsert(rows);
    }

    if (data.cleaningTasks && data.cleaningTasks.length > 0) {
      const rows = data.cleaningTasks.map((c) => ({
        id: c.id,
        name: c.name,
        zone: c.zone,
        frequency: c.frequency,
        period: c.period ?? null,
        completed: c.completed,
        completed_at: c.completedAt ?? null,
        completed_by: c.completedBy ?? null,
        instructions: c.instructions ?? null,
      }));
      await supabase.from('ps_haccp_cleaning_tasks').upsert(rows);
    }

    return true;
  } catch (err) {
    console.error('[Supabase] push error:', err);
    return false;
  }
};

/**
 * Direct single-item Supabase operations for instant responsiveness
 */
export const insertReceiptToSupabase = async (receipt: GoodsReceipt): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    let invoiceUrl = receipt.invoicePhotoUrl;
    let goodsUrl = receipt.goodsPhotoUrl;

    // Upload photos if base64
    if (invoiceUrl && invoiceUrl.startsWith('data:image')) {
      invoiceUrl = await uploadPhotoToSupabase(invoiceUrl, 'facture');
    }
    if (goodsUrl && goodsUrl.startsWith('data:image')) {
      goodsUrl = await uploadPhotoToSupabase(goodsUrl, 'marchandise');
    }

    await supabase.from('ps_haccp_receipts').upsert({
      id: receipt.id,
      supplier: receipt.supplier,
      category: receipt.category || 'Courses / Marchandises',
      truck_temp: receipt.truckTemp ?? null,
      is_temp_compliant: receipt.isTempCompliant ?? true,
      is_package_intact: receipt.isPackageIntact ?? true,
      timestamp: receipt.timestamp,
      received_by: receipt.receivedBy || 'Utilisateur',
      invoice_photo_url: invoiceUrl ?? null,
      goods_photo_url: goodsUrl ?? null,
      status: receipt.status,
      notes: receipt.notes ?? null,
    });
  } catch (err) {
    console.warn('[Supabase] insert receipt error:', err);
  }
};

export const deleteReceiptFromSupabase = async (id: string): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    await supabase.from('ps_haccp_receipts').delete().eq('id', id);
  } catch (err) {
    console.warn('[Supabase] delete receipt error:', err);
  }
};

export const upsertTargetToSupabase = async (target: TemperatureTarget): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    let photoUrl = target.photoUrl;
    if (photoUrl && photoUrl.startsWith('data:image')) {
      photoUrl = await uploadPhotoToSupabase(photoUrl, 'frigo');
    }

    await supabase.from('ps_haccp_targets').upsert({
      id: target.id,
      name: target.name,
      type: target.type,
      zone: target.zone || 'Fournil',
      min_temp: target.minTemp,
      max_temp: target.maxTemp,
      current_temp: target.currentTemp ?? null,
      photo_url: photoUrl ?? null,
      last_checked: target.lastChecked ?? null,
    });
  } catch (err) {
    console.warn('[Supabase] upsert target error:', err);
  }
};

export const deleteTargetFromSupabase = async (id: string): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    await supabase.from('ps_haccp_targets').delete().eq('id', id);
  } catch (err) {
    console.warn('[Supabase] delete target error:', err);
  }
};

export const insertRecordToSupabase = async (record: TemperatureRecord): Promise<void> => {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  try {
    await supabase.from('ps_haccp_records').insert({
      id: record.id,
      target_id: record.targetId,
      target_name: record.targetName,
      temp_value: record.value,
      min_allowed: record.minTemp,
      max_allowed: record.maxTemp,
      is_compliant: record.status === 'conforme',
      recorded_at: record.timestamp,
      operator_name: record.userName,
      status: record.status,
      notes: record.correctiveAction ?? null,
    });
  } catch (err) {
    console.warn('[Supabase] insert record error:', err);
  }
};

/**
 * The exact isolated SQL Schema to run in Supabase SQL Editor
 */
export const SUPABASE_SQL_SCHEMA = `-- 🥐 PLAISIRS & SAVEURS • TABLES 100% ISOLÉES (Préfixe: ps_haccp_)
-- Aucune interférence avec Twin Pizza ou Allstar Academy

-- 1. Table des Équipements (Frigos & Congélateurs)
CREATE TABLE IF NOT EXISTS ps_haccp_targets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  zone TEXT DEFAULT 'Général',
  min_temp NUMERIC NOT NULL,
  max_temp NUMERIC NOT NULL,
  target_temp NUMERIC NOT NULL,
  current_temp NUMERIC,
  photo_url TEXT,
  last_checked TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table des Relevés de Température
CREATE TABLE IF NOT EXISTS ps_haccp_records (
  id TEXT PRIMARY KEY,
  target_id TEXT NOT NULL,
  target_name TEXT NOT NULL,
  temp_value NUMERIC NOT NULL,
  min_allowed NUMERIC,
  max_allowed NUMERIC,
  is_compliant BOOLEAN DEFAULT TRUE,
  recorded_at TEXT NOT NULL,
  operator_name TEXT NOT NULL,
  status TEXT DEFAULT 'conforme',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table des Réceptions de Marchandises & Courses
CREATE TABLE IF NOT EXISTS ps_haccp_receipts (
  id TEXT PRIMARY KEY,
  supplier TEXT NOT NULL,
  category TEXT DEFAULT 'Courses / Marchandises',
  truck_temp NUMERIC,
  is_temp_compliant BOOLEAN DEFAULT TRUE,
  is_package_intact BOOLEAN DEFAULT TRUE,
  timestamp TEXT NOT NULL,
  received_by TEXT NOT NULL,
  invoice_photo_url TEXT,
  goods_photo_url TEXT,
  status TEXT DEFAULT 'conforme',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table des Étiquettes DLC Secondaires
CREATE TABLE IF NOT EXISTS ps_haccp_secondary_dlc (
  id TEXT PRIMARY KEY,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  prep_date TEXT NOT NULL,
  duration_hours NUMERIC NOT NULL,
  expiry_date TEXT NOT NULL,
  prepared_by TEXT NOT NULL,
  storage_temp TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table du Plan de Nettoyage
CREATE TABLE IF NOT EXISTS ps_haccp_cleaning_tasks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  zone TEXT NOT NULL,
  frequency TEXT NOT NULL,
  period TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TEXT,
  completed_by TEXT,
  instructions TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Activer le Realtime pour toutes les tables Plaisirs & Saveurs
ALTER PUBLICATION supabase_realtime ADD TABLE ps_haccp_targets, ps_haccp_records, ps_haccp_receipts, ps_haccp_secondary_dlc, ps_haccp_cleaning_tasks;

-- 7. Créer le Bucket de Stockage Photos Dédié
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ps-haccp-photos', 'ps-haccp-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 8. Règles de Sécurité (RLS Permissif pour l'App)
ALTER TABLE ps_haccp_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ps_haccp_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE ps_haccp_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ps_haccp_secondary_dlc ENABLE ROW LEVEL SECURITY;
ALTER TABLE ps_haccp_cleaning_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all on ps_haccp_targets" ON ps_haccp_targets FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ps_haccp_records" ON ps_haccp_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ps_haccp_receipts" ON ps_haccp_receipts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ps_haccp_secondary_dlc" ON ps_haccp_secondary_dlc FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all on ps_haccp_cleaning_tasks" ON ps_haccp_cleaning_tasks FOR ALL USING (true) WITH CHECK (true);

-- 9. Règle Storage pour les Photos
CREATE POLICY "Public Read ps-haccp-photos" ON storage.objects FOR SELECT USING (bucket_id = 'ps-haccp-photos');
CREATE POLICY "Public Insert ps-haccp-photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'ps-haccp-photos');
CREATE POLICY "Public Update ps-haccp-photos" ON storage.objects FOR UPDATE USING (bucket_id = 'ps-haccp-photos');
CREATE POLICY "Public Delete ps-haccp-photos" ON storage.objects FOR DELETE USING (bucket_id = 'ps-haccp-photos');
`;
