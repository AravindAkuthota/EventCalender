import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Event, EventFormData } from '@/types/event';
import { formatDateTime } from '@/lib/calendar';
import { useEffect, useState } from 'react';

interface EventDialogProps {
  event?: Event;
  selectedDate?: Date;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: EventFormData) => void;
  onDelete?: () => void;
  checkConflict: (event: EventFormData) => boolean;
}

export function EventDialog({
  event,
  selectedDate,
  open,
  onOpenChange,
  onSave,
  onDelete,
  checkConflict,
}: EventDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (selectedDate) {
      const dateStr = formatDateTime(selectedDate);
      setFormData({
        title: '',
        startDate: dateStr,
        endDate: dateStr,
        description: '',
      });
    }
  }, [event, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.title.length > 50) {
      toast({
        title: 'Error',
        description: 'Title must be less than 50 characters',
        variant: 'destructive',
      });
      return;
    }

    if (formData.description && formData.description.length > 500) {
      toast({
        title: 'Error',
        description: 'Description must be less than 500 characters',
        variant: 'destructive',
      });
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast({
        title: 'Error',
        description: 'End date must be after start date',
        variant: 'destructive',
      });
      return;
    }

    if (checkConflict(formData)) {
      toast({
        title: 'Error',
        description: 'This event conflicts with an existing event',
        variant: 'destructive',
      });
      return;
    }

    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{event ? 'Edit Event' : 'Create Event'}</DialogTitle>
            <DialogDescription>
              Fill in the details for your event. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="col-span-3"
                required
                maxLength={50}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start
              </Label>
              <Input
                id="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End
              </Label>
              <Input
                id="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                maxLength={500}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            {onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={onDelete}
              >
                Delete
              </Button>
            )}
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}