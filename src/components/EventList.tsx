import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Event } from '@/types/event';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { Search, Calendar as CalendarIcon } from 'lucide-react';

interface EventListProps {
  events: Event[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEventClick: (event: Event) => void;
}

export function EventList({
  events,
  open,
  onOpenChange,
  onEventClick,
}: EventListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = events
    .filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4">
          <SheetTitle className="text-2xl font-bold">Events</SheetTitle>
          <SheetDescription>View and manage your upcoming events</SheetDescription>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>
        </SheetHeader>
        <div className="mt-8 space-y-4">
          {filteredEvents.map((event) => (
            <Button
              key={event.id}
              variant="outline"
              className="w-full justify-start text-left h-auto flex-col items-start p-4 event-card"
              onClick={() => onEventClick(event)}
            >
              <div className="flex items-center gap-2 text-primary font-semibold">
                <CalendarIcon className="h-4 w-4" />
                {event.title}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {format(new Date(event.startDate), 'PPp')}
              </div>
              {event.description && (
                <div className="text-sm text-muted-foreground/80 mt-2 line-clamp-2">
                  {event.description}
                </div>
              )}
            </Button>
          ))}
          {filteredEvents.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              No events found
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}