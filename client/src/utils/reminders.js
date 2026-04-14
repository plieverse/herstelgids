import { DIARY_DONE_KEY, todayKey } from '../pages/diary/DiaryPage';

const TIMEOUT_HANDLE = '_dagboekReminderTimeout';

/**
 * Request browser notification permission.
 * Returns 'granted' | 'denied' | 'unsupported'.
 */
export async function requestNotificationPermission() {
  if (!('Notification' in window)) return 'unsupported';
  if (Notification.permission === 'granted') return 'granted';
  if (Notification.permission === 'denied') return 'denied';
  const result = await Notification.requestPermission();
  return result;
}

/**
 * Schedule a daily diary reminder at `timeStr` ("HH:MM").
 * Cancels any previously scheduled reminder first.
 * Does nothing when the browser tab is closed — that would require a
 * server-side push service, which is out of scope for this prototype.
 */
export function scheduleReminder(timeStr) {
  if (!timeStr || !('Notification' in window)) return;

  // Cancel existing timer
  if (window[TIMEOUT_HANDLE]) {
    clearTimeout(window[TIMEOUT_HANDLE]);
    window[TIMEOUT_HANDLE] = null;
  }

  const [h, m] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return;

  const now = new Date();
  const next = new Date(now);
  next.setHours(h, m, 0, 0);

  // Already passed today → schedule for tomorrow
  if (next <= now) next.setDate(next.getDate() + 1);

  const delay = next.getTime() - now.getTime();

  window[TIMEOUT_HANDLE] = setTimeout(async () => {
    // Only notify when diary hasn't been filled yet today
    const diaryDone = localStorage.getItem(DIARY_DONE_KEY) === todayKey();
    if (!diaryDone && Notification.permission === 'granted') {
      try {
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready;
          await reg.showNotification('De Lichaamsgids', {
            body: 'Vergeet niet je dagboek in te vullen vandaag!',
            icon: '/icons/icon-192.png',
            tag: 'dagboek-reminder', // prevents duplicates
          });
        } else {
          new Notification('De Lichaamsgids', {
            body: 'Vergeet niet je dagboek in te vullen vandaag!',
            icon: '/icons/icon-192.png',
          });
        }
      } catch { /* notification blocked or SW unavailable */ }
    }
    // Re-schedule for the same time tomorrow
    scheduleReminder(timeStr);
  }, delay);
}
