import { useCallback, useEffect, useState } from 'react';
import { Event } from '@/types/event';

const STORAGE_KEY = 'calendar-events';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem(STORAGE_KEY);
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  const saveEvents = useCallback((newEvents: Event[]) => {
    setEvents(newEvents);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents));
  }, []);

  const addEvent = useCallback((event: Event) => {
    saveEvents([...events, event]);
  }, [events, saveEvents]);

  const updateEvent = useCallback((updatedEvent: Event) => {
    const newEvents = events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    );
    saveEvents(newEvents);
  }, [events, saveEvents]);

  const deleteEvent = useCallback((eventId: string) => {
    const newEvents = events.filter(event => event.id !== eventId);
    saveEvents(newEvents);
  }, [events, saveEvents]);

  const getEventsForDate = useCallback((date: string) => {
    return events.filter(event => event.startDate.startsWith(date));
  }, [events]);

  const searchEvents = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(lowercaseQuery) ||
      event.description?.toLowerCase().includes(lowercaseQuery)
    );
  }, [events]);

  const checkEventConflict = useCallback((newEvent: Event, excludeId?: string) => {
    return events.some(event => {
      if (event.id === excludeId) return false;
      
      const newStart = new Date(newEvent.startDate);
      const newEnd = new Date(newEvent.endDate);
      const existingStart = new Date(event.startDate);
      const existingEnd = new Date(event.endDate);

      return (
        (newStart >= existingStart && newStart < existingEnd) ||
        (newEnd > existingStart && newEnd <= existingEnd) ||
        (newStart <= existingStart && newEnd >= existingEnd)
      );
    });
  }, [events]);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    searchEvents,
    checkEventConflict,
  };
};