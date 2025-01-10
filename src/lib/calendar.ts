import { addDays, addMonths, endOfMonth, format, getDay, startOfMonth, subMonths } from 'date-fns';

export const generateCalendarDays = (date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const days = [];

  // Add days from previous month to fill first week
  const startDay = getDay(start);
  for (let i = startDay - 1; i >= 0; i--) {
    days.push({
      date: addDays(start, -i - 1),
      isCurrentMonth: false,
    });
  }

  // Add days of current month
  let currentDate = start;
  while (currentDate <= end) {
    days.push({
      date: currentDate,
      isCurrentMonth: true,
    });
    currentDate = addDays(currentDate, 1);
  }

  // Add days from next month to complete last week
  const endDay = getDay(end);
  for (let i = 1; i < 7 - endDay; i++) {
    days.push({
      date: addDays(end, i),
      isCurrentMonth: false,
    });
  }

  return days;
};

export const navigateMonth = (date: Date, direction: 'prev' | 'next') => {
  return direction === 'prev' ? subMonths(date, 1) : addMonths(date, 1);
};

export const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');
export const formatDateTime = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");