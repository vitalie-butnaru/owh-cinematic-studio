import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, differenceInDays, addDays } from 'date-fns';
import { ro } from 'date-fns/locale';
import { Calendar as CalendarIcon, Info } from 'lucide-react';

interface RentalCalendarProps {
  onSelectDates: (startDate: Date, endDate: Date) => void;
  unavailableDates?: Date[];
  minDays?: number;
  maxDays?: number;
}

export default function RentalCalendar({
  onSelectDates,
  unavailableDates = [],
  minDays = 1,
  maxDays = 30,
}: RentalCalendarProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (!startDate || (startDate && endDate)) {
      // Start new selection
      setStartDate(date);
      setEndDate(undefined);
    } else {
      // Complete selection
      if (date > startDate) {
        setEndDate(date);
        onSelectDates(startDate, date);
      } else {
        setStartDate(date);
        setEndDate(undefined);
      }
    }
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(
      (unavailable) =>
        format(unavailable, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const getRentalDays = () => {
    if (!startDate || !endDate) return 0;
    return Math.max(1, differenceInDays(endDate, startDate) + 1);
  };

  const resetSelection = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          Selectează Perioada
        </CardTitle>
        <CardDescription>
          Alege data de început și data de sfârșit pentru închiriere
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calendar */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleDateSelect}
            disabled={(date) => {
              // Disable past dates
              if (date < new Date()) return true;
              // Disable unavailable dates
              if (isDateUnavailable(date)) return true;
              // Disable dates beyond max range
              if (startDate && !endDate) {
                const maxDate = addDays(startDate, maxDays);
                if (date > maxDate) return true;
              }
              return false;
            }}
            modifiers={{
              inRange: (date) => isDateInRange(date),
              start: startDate ? [startDate] : [],
              end: endDate ? [endDate] : [],
            }}
            modifiersStyles={{
              inRange: { backgroundColor: 'hsl(var(--primary) / 0.2)' },
              start: { backgroundColor: 'hsl(var(--primary))' },
              end: { backgroundColor: 'hsl(var(--primary))' },
            }}
            locale={ro}
            className="rounded-md border"
          />
        </div>

        {/* Selection Info */}
        {startDate && (
          <div className="space-y-3 p-4 rounded-lg bg-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data început:</span>
              <Badge variant="secondary">
                {format(startDate, 'dd MMM yyyy', { locale: ro })}
              </Badge>
            </div>
            
            {endDate && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data sfârșit:</span>
                  <Badge variant="secondary">
                    {format(endDate, 'dd MMM yyyy', { locale: ro })}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-medium">Total zile:</span>
                  <Badge className="bg-primary">
                    {getRentalDays()} {getRentalDays() === 1 ? 'zi' : 'zile'}
                  </Badge>
                </div>
              </>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={resetSelection}
              className="w-full"
            >
              Resetează Selecția
            </Button>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium">Cum funcționează:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Click pentru a selecta data de început</li>
              <li>• Click din nou pentru data de sfârșit</li>
              <li>• Zilele indisponibile sunt dezactivate</li>
              <li>• Minimum {minDays} {minDays === 1 ? 'zi' : 'zile'}, maximum {maxDays} zile</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
