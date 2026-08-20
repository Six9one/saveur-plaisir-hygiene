// Service Worker for Plaisirs & Saveurs HACCP
// Manages caching, background push notifications, and Sunday 12:00 big cleaning alerts

const CACHE_NAME = 'saveur-plaisir-v3';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Network First fetch strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => response)
      .catch(() => caches.match(event.request))
  );
});

// Helper: Show Big Cleaning Notification
function showSundayCleaningNotification(customBody) {
  const title = '🧹 PLAISIRS & SAVEURS • GRAND NETTOYAGE';
  const options = {
    body: customBody || '⚠️ Dimanche 12h00 : Grand Nettoyage & Désinfection complète obligatoire des machines, fournil & labo avant fermeture !',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [400, 150, 400, 150, 800, 300, 800],
    tag: 'grand-nettoyage-hebdo',
    renotify: true,
    requireInteraction: true,
    data: {
      url: '/?tab=cleaning',
      timestamp: Date.now()
    },
    actions: [
      { action: 'open_cleaning', title: 'Ouvrir le Nettoyage' }
    ]
  };

  return self.registration.showNotification(title, options);
}

// Push Event from Web Push / Server
self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { body: event.data ? event.data.text() : '' };
  }

  event.waitUntil(showSundayCleaningNotification(data.body));
});

// Notification Click handler: focus or open PWA to cleaning tab
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          client.navigate('/?tab=cleaning');
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/?tab=cleaning');
      }
    })
  );
});

// Client PostMessage handler (Test Notification & Local Trigger)
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'TRIGGER_TEST_NOTIFICATION') {
    event.waitUntil(
      showSundayCleaningNotification(
        '🔔 Test réussi ! Alerte Grand Nettoyage programmée chaque Dimanche à 12h00 pour toute l\'équipe.'
      )
    );
  }

  if (event.data.type === 'TRIGGER_SUNDAY_CLEANING') {
    event.waitUntil(showSundayCleaningNotification());
  }
});

// Background periodic check for Sunday 12:00
let lastNotificationSunday = null;

function checkSundaySchedule() {
  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Dimanche entre 12h00 et 12h30
  if (day === 0 && hour === 12 && minute <= 30) {
    const todayStr = now.toDateString();
    if (lastNotificationSunday !== todayStr) {
      lastNotificationSunday = todayStr;
      showSundayCleaningNotification();
    }
  }
}

// Periodic check every 15 minutes
setInterval(checkSundaySchedule, 15 * 60 * 1000);
