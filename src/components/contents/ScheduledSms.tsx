'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";





const scheduledSms = [
  {
    id: 1,
    recipients: '+2347012345678, +2348098765432',
    message: 'Don’t forget our team meeting tomorrow at 10 AM.',
    scheduledTime: '2025-08-05 09:00 AM',
    status: 'Pending',
  },
  {
    id: 2,
    recipients: '+2347011122233',
    message: 'Your service will expire in 3 days.',
    scheduledTime: '2025-08-06 08:00 AM',
    status: 'Sent',
  },
];

export default function ScheduledSms() {
    const [search, setSearch] = useState("");
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("12:00");
    const [rescheduleSmsId, setRescheduleSmsId] = useState<string | null>(null);
    
      const filteredSMS = scheduledSms.filter((sms) =>
        sms.recipients.includes(search)
      );
  return (
    <div className="space-y-6 p-6">
        <h2 className="text-xl font-semibold">SCheduled Sms Messages</h2>

        <div className="flex gap-2 items-center">
        <Input
            placeholder="Search by phone number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
        />
        <Button variant="outline" onClick={() => setSearch("")}>Reset</Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Scheduled SMS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Recipients</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[180px]">Scheduled Time</TableHead>
                  <TableHead className="w-[120px]">Status</TableHead>
                  <TableHead className="w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSMS.map((sms) => (
                  <TableRow key={sms.id}>
                    <TableCell>{sms.recipients}</TableCell>
                    <TableCell className="max-w-xs truncate">{sms.message}</TableCell>
                    <TableCell>{sms.scheduledTime}</TableCell>
                    <TableCell>
                      <Badge
                        variant={sms.status === 'Pending' ? 'secondary' : 'default'}
                      >
                        {sms.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                                Update <MoreVertical className="ml-1 h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuItem
                            onClick={() => {
                                setRescheduleSmsId(sms.id.toString()); // capture ID
                                setRescheduleModalOpen(true);
                            }}
                            >
                            Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => console.log(`Send now ${sms.id}`)}>
                                Send Now
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-red-500 focus:text-red-600"
                                onClick={() => console.log(`Delete ${sms.id}`)}
                            >
                                Delete
                            </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

        <Dialog open={rescheduleModalOpen} onOpenChange={setRescheduleModalOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                <DialogTitle>Reschedule SMS</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Select Date</label>
                    <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Select Time</label>
                    <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    />
                </div>
                </div>

                <DialogFooter className="mt-4">
                <Button
                    onClick={() => {
                    if (!selectedDate || !selectedTime || !rescheduleSmsId) return;

                    const rescheduledAt = new Date(selectedDate);
                    const [hours, minutes] = selectedTime.split(":");
                    rescheduledAt.setHours(Number(hours));
                    rescheduledAt.setMinutes(Number(minutes));

                    console.log("Rescheduling SMS:", {
                        id: rescheduleSmsId,
                        newTime: rescheduledAt,
                    });

                    // TODO: call API here
                    setRescheduleModalOpen(false);
                    }}
                >
                    Submit
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>

    </div>
  );
}
