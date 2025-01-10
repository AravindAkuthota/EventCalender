import { Calendar } from '@/components/Calendar';
import { EventDialog } from '@/components/EventDialog';
import { EventList } from '@/components/EventList';
import { Button } from '@/components/ui/button';
import { useEvents } from '@/hooks/useEvents';
import { Event, EventFormData } from '@/types/event';
import { ListTodo, Plus } from 'lucide-react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showEventList, setShowEventList] = useState(false);
  
  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    checkEventConflict,
  } = useEvents();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setShowEventDialog(true);
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setSelectedDate(undefined);
    setShowEventDialog(true);
  };

  const handleSaveEvent = (formData: EventFormData) => {
    if (selectedEvent) {
      updateEvent({ ...formData, id: selectedEvent.id });
    } else {
      addEvent({ ...formData, id: uuidv4() });
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setShowEventDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Calendar</h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              onClick={() => {
                setSelectedDate(new Date());
                setSelectedEvent(undefined);
                setShowEventDialog(true);
              }}
              className="flex-1 sm:flex-none items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Event
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEventList(true)}
              className="flex-1 sm:flex-none items-center gap-2"
            >
              <ListTodo className="h-4 w-4" />
              View All
            </Button>
          </div>
        </div>

        <Calendar
          events={events}
          onDateSelect={handleDateSelect}
        />

        <EventDialog
          event={selectedEvent}
          selectedDate={selectedDate}
          open={showEventDialog}
          onOpenChange={setShowEventDialog}
          onSave={handleSaveEvent}
          onDelete={selectedEvent ? handleDeleteEvent : undefined}
          checkConflict={(event) => checkEventConflict(event, selectedEvent?.id)}
        />

        <EventList
          events={events}
          open={showEventList}
          onOpenChange={setShowEventList}
          onEventClick={(event) => {
            handleEventSelect(event);
            setShowEventList(false);
          }}
        />
      </div>
    </div>
  );
}

export default App;