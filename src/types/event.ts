export interface Event {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  color?: string;
}

export interface EventFormData {
  title: string;
  startDate: string;
  endDate: string;
  description?: string;
  color?: string;
}

export type CalendarView = 'month' | 'week' | 'day';