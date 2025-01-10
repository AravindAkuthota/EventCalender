import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateCalendarDays, navigateMonth } from '@/lib/calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { format, isSameDay, isToday, isWeekend } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from '@/types/event';

interface CalendarProps {
  events: Event[];
  onDateSelect: (date: Date) => void;
}

export function Calendar({ events, onDateSelect }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = generateCalendarDays(currentDate);

  const handleMonthNavigation = (direction: 'prev' | 'next') => {
    setCurrentDate(navigateMonth(currentDate, direction));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      isSameDay(new Date(event.startDate), date)
    );
  };

  return (
    <Card className="p-6 shadow-lg rounded-xl bg-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthNavigation('prev')}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleMonthNavigation('next')}
            className="rounded-full hover:bg-primary/10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-sm text-muted-foreground p-2"
          >
            {day}
          </div>
        ))}

        {days.map(({ date, isCurrentMonth }, index) => {
          const dayEvents = getEventsForDate(date);
          const isWeekendDay = isWeekend(date);
          const isCurrentDay = isToday(date);

          return (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                'h-28 p-2 relative flex flex-col items-start justify-start calendar-day-hover rounded-lg',
                {
                  'opacity-40': !isCurrentMonth,
                  'bg-primary/10 border-primary': isCurrentDay,
                  'text-destructive/80': isWeekendDay && isCurrentMonth,
                  'hover:bg-accent': isCurrentMonth,
                }
              )}
              onClick={() => onDateSelect(date)}
            >
              <span className={cn(
                'text-sm font-semibold rounded-full w-7 h-7 flex items-center justify-center mb-1',
                {
                  'bg-primary text-primary-foreground': isCurrentDay,
                }
              )}>
                {format(date, 'd')}
              </span>
              <div className="w-full space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs truncate text-left p-1.5 rounded-md bg-primary/15 text-primary-foreground/90 event-card"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-muted-foreground text-left px-1.5 font-medium">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}