import { format, parseISO, isToday, isYesterday, formatDistanceToNow } from 'date-fns';
import { nl } from 'date-fns/locale';

export function formatDate(dateStr) {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  if (isToday(date)) return 'Vandaag';
  if (isYesterday(date)) return 'Gisteren';
  return format(date, 'd MMMM yyyy', { locale: nl });
}

export function formatDateShort(dateStr) {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'd MMM', { locale: nl });
}

export function formatDateTime(dateStr) {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return format(date, 'd MMM, HH:mm', { locale: nl });
}

export function timeAgo(dateStr) {
  const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
  return formatDistanceToNow(date, { locale: nl, addSuffix: true });
}

export function todayISO() {
  return format(new Date(), 'yyyy-MM-dd');
}
