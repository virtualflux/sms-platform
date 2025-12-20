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
import { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import Loader from '../ui/Loader';
import { Alert } from '../ui/alert';
import { apiFetch } from '@/lib/api/client';
import { AdvancedFilter } from '../AdvanceFilter';
import { Pagination } from '../Pagination';
import moment from 'moment';
import { getSocket } from '@/lib/socket';



interface ISmsData {
  id: string;
  sender: string;
  recipients: string;
  message: string;
  cost: number;
  status: string;
  createdAt: string;
  scheduleAt: string;
  sentAt: string;
}


export default function ScheduledSms() {
    const [data, setData] = useState<ISmsData[]>([])
    const [query, setQuery] = useState<any>({}); 
    const [page, setPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string>("12:00");
    const [rescheduleSmsId, setRescheduleSmsId] = useState<string | null>(null);
    const [pending, setPending] = useState(false)
    const [loaded, setLoaded] = useState(false)
    
    useEffect(()=>{
      handleFetch()
    },[])

    const handleFetch = async (filterQuery = {}, pageNumber = page, load = true) =>{
      if(load)setLoading(true)
      try {
        const queryString = new URLSearchParams(
          Object.fromEntries(
            Object.entries({
              ...filterQuery,
              page: pageNumber,
            }).map(([key, val]) => [key, String(val)])
          )
        ).toString();
        const response = await apiFetch(`/sms/schedule?${queryString}`);
  
        if(response?.success){
          setData(response?.data?.data);
          setTotalPages(response?.data?.totalPages)
          setPage(response?.data?.page)
        }else{
          Alert({
            title: 'Error',
            icon: 'error',
            text: response?.message,
            darkMode: true
          });
        }
  
      } catch (error) {
        console.log(error);
        Alert({
          title: 'Error',
          icon: 'error',
          text: "Something went wrong!",
          darkMode: true
        });
      }finally{
        setLoading(false)
        setLoaded(true)
      }
    };

    useEffect(() => {
        let socket = getSocket()

        if(!socket){
        const interval = setInterval(() => {
            socket = getSocket()
            if(socket){
                clearInterval(interval)
                setupListener(socket)
            }
        }, 1000);

        return () => clearInterval(interval)
        }

        setupListener(socket)

        function setupListener(s: any){
            const handleNotification = (data: any) => {
                handleFetch(query, page, false)
            }

            s.on('user:notification', handleNotification)

            return () => s.off('user:notification', handleNotification)
        }

    },[handleFetch])
  
    const handleFilter = (values:any) => {
      const formatted: any = {};
      if(values.recipient) formatted.recipient = values.recipient;
      if(values.status) formatted.status = values.status;
  
      if(values.date?.from && values.date?.to){
        formatted.from = values.date.from;
        formatted.to = values.date.to;
      }
  
      setQuery(formatted);
      setPage(1);
      handleFetch(formatted, 1, false);
    };
  
    const handlePageChange = (newPage:number) => {
      setPage(newPage);
      handleFetch(query, newPage);
    };

    const handleUpdate = async (action: "DELETE" | "SEND_NOW" | "RESCHEDULE", id?: string) =>{
      const payload = {
        action
      } as any
      if(action === 'RESCHEDULE'){
        if (!selectedDate || !selectedTime || !rescheduleSmsId) return;
          id = rescheduleSmsId
          const rescheduledAt = new Date(selectedDate);
          const [hours, minutes] = selectedTime.split(":");
          rescheduledAt.setHours(Number(hours));
          rescheduledAt.setMinutes(Number(minutes));
          payload.scheduleAt = rescheduledAt

          console.log("Rescheduling SMS:", {
              id: rescheduleSmsId,
              newTime: rescheduledAt,
          });
      }
      setPending(true)
      try {
        
        const response = await apiFetch(
          `/sms/schedule?id=${id}`,
          'PUT',
          payload
        )
        if(response?.success){
          handleFetch(query,page, false)
          setRescheduleModalOpen(false);
          Alert({
            title: 'Success',
            icon: 'success',
            text: response?.message,
            darkMode: true
          });
        }else{
          Alert({
            title: 'Error',
            icon: 'error',
            text: response?.message,
            darkMode: true
          });
        }
      } catch (error) {
        console.log(error)
        Alert({
          title: 'Error',
          icon: 'error',
          text: "Something went wrong",
          darkMode: true
        });
      }finally{
        setPending(false)
      }
    }
  
  if(loading && !loaded) return <Loader/>

  return (
    <div className="space-y-6 p-6">
        <h2 className="text-xl font-semibold">Scheduled Sms Messages</h2>

        <div>
          <AdvancedFilter
            title="Scheduled SMS History Filter"
            onApply={handleFilter}
            fields={[
              {type:"text", name:"recipient", label:"Search"},
              {type:"select", name:"status", label:"Status", options:[
                {label:"Pending", value:"PENDING"},
                {label:"Sent", value:"SENT"},
                {label:"Failed", value:"FAILED"},
              ]},
              {type:"dateRange", name:"date", label:"Date Range"},
            ]}
          />
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
                {data.length > 0 && data.map((sms) => (
                  <TableRow key={sms.id}>
                    <TableCell>{sms.recipients}</TableCell>
                    <TableCell className="max-w-xs truncate">{sms.message}</TableCell>
                    <TableCell>{moment(sms.scheduleAt).format("DD MMM, YYYY, hh:mm")}</TableCell>
                    <TableCell>
                      <Badge
                        variant={sms.status === 'PENDING' ? 'secondary' : 'default'}
                      >
                        {sms.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline">
                                {pending? "Loading..." : "Update"} <MoreVertical className="ml-1 h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            {sms.status === "PENDING" &&<DropdownMenuItem
                            onClick={() => {
                                setRescheduleSmsId(sms.id.toString());
                                setRescheduleModalOpen(true);
                            }}
                            >
                              Reschedule
                            </DropdownMenuItem>}
                            {sms.status === "PENDING" && <DropdownMenuItem 
                            disabled={pending}
                            onClick={() => handleUpdate("SEND_NOW",sms.id)}>
                                {pending ? "Loading..." : "Send Now"}
                            </DropdownMenuItem>}
                            <DropdownMenuItem
                            disabled={pending}
                            className="text-red-500 focus:text-red-600"
                            onClick={() =>  handleUpdate("DELETE",sms.id)}
                            >
                                {pending? "Loading...":"Delete"}
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
                onClick={() => handleUpdate("RESCHEDULE")}
                disabled={pending}
              >
                  {pending ? "Loading..." : "Submit"}
              </Button>
              </DialogFooter>
          </DialogContent>
          </Dialog>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => handlePageChange(p)}
      />
    </div>
  );
}
