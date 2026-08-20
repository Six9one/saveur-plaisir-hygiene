/**
 * Push & Scheduled Notification Service for Plaisirs & Saveurs HACCP
 * Manages background Sunday 12:00 Big Cleaning notifications & instant test alerts
 */

export interface NotificationStatus {
  isSupported: boolean;
  permission: NotificationPermission;
  isServiceWorkerReady: boolean;
}

export const checkNotificationSupport = (): boolean => {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!checkNotificationSupport()) return 'denied';
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!checkNotificationSupport()) {
    alert('Les notifications push ne sont pas supportées par ce navigateur.');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Register Service Worker if needed
      if (navigator.serviceWorker) {
        const registration = await navigator.serviceWorker.ready;
        if (registration) {
          // Schedule Sunday Check
          scheduleSundayCleaningReminder();
        }
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

export const triggerTestNotification = async (): Promise<boolean> => {
  if (!checkNotificationSupport()) return false;

  if (Notification.permission !== 'granted') {
    const granted = await requestNotificationPermission();
    if (!granted) return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    if (registration) {
      if (registration.active) {
        registration.active.postMessage({ type: 'TRIGGER_TEST_NOTIFICATION' });
      } else {
        await registration.showNotification('🧹 PLAISIRS & SAVEURS • GRAND NETTOYAGE', {
          body: '🔔 Test réussi ! Alerte Grand Nettoyage programmée chaque Dimanche à 12h00 pour toute l\'équipe.',
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          tag: 'test-notification',
          renotify: true,
          requireInteraction: true,
        } as any);
      }
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error triggering test notification:', err);
    return false;
  }
};

/**
 * Calculates milliseconds until next Sunday at 12:00:00
 */
export const getMillisecondsUntilNextSunday12pm = (): number => {
  const now = new Date();
  const nextSunday = new Date(now);

  const currentDay = now.getDay(); // 0 = Dimanche
  const daysUntilSunday = (7 - currentDay) % 7;

  nextSunday.setDate(now.getDate() + (daysUntilSunday === 0 && (now.getHours() > 12 || (now.getHours() === 12 && now.getMinutes() > 0)) ? 7 : daysUntilSunday));
  nextSunday.setHours(12, 0, 0, 0);

  const diff = nextSunday.getTime() - now.getTime();
  return Math.max(diff, 1000);
};

export const scheduleSundayCleaningReminder = (): void => {
  if (!checkNotificationSupport() || Notification.permission !== 'granted') return;

  const msUntilSunday12 = getMillisecondsUntilNextSunday12pm();
  console.log(`[HACCP] Prochaine alerte Grand Nettoyage programmée dans ${Math.round(msUntilSunday12 / (1000 * 60))} minutes.`);

  setTimeout(async () => {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.active) {
        reg.active.postMessage({ type: 'TRIGGER_SUNDAY_CLEANING' });
      }
      // Re-schedule for subsequent week
      scheduleSundayCleaningReminder();
    } catch (e) {
      console.warn('[HACCP] Scheduled cleaning alert error:', e);
    }
  }, msUntilSunday12);
};
