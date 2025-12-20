"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectTrigger, SelectItem, SelectContent, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { addDays } from "date-fns"
import { apiFetch } from "@/lib/api/client"
import CreateTemplateModal, { TemplateFormValues } from "../modals/CreateTemplate"
import CreateSenderIdModal, { SenderIdFormValues } from "../modals/CreateSenderId"
import { Alert } from "../ui/alert"
import { getSocket } from "@/lib/socket"

type FormData = {
  senderId: string;
  recipients: string;
  message: string;
  schedule: boolean;
  scheduleAt?: Date;
  templateId?: string;
};

interface ITemplates{
  id: string;
  name: string;
  content: string;
}

interface ISenderIds{
  id: string;
  sender: string;
  status: string;
}

const formSchema = z.object({
  senderId: z.string().max(11, "Sender name max 11 chars"),
  recipients: z.string().min(1, "Recipients required"),
  message: z.string().min(1, "Message required"),
  schedule: z.boolean(),
  scheduleAt: z.date().optional(),
  templateId: z.string().optional(),
})

export default function SendSMSForm() {
  const [charCount, setCharCount] = useState(0)
  const [senderIds, setSenderIds] = useState<ISenderIds[]>([])
  const [templates, setTemplates] = useState<ITemplates[]>([])
  const [error, setError] = useState<string | null>('')
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openSenderId, setOpenSenderId] = useState(false);
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const form = useForm<FormData>({
    defaultValues: {
      senderId: "",
      recipients: "",
      message: "",
      schedule: false,
      scheduleAt: undefined,
      templateId: undefined,
    },
  });

  const watchRecipients = form.watch("recipients")
  const watchMessage = form.watch("message")
  const watchSchedule = form.watch("schedule")

  const recipientsList = watchRecipients
    ?.split(/[\n,]+/)
    .map(r => r.trim())
    .filter(Boolean)

  const smsCount = Math.ceil((watchMessage?.length || 0) / 160) * recipientsList.length

  useEffect(()=>{
    handleFetch()
  },[])

  const handleFetch = async () => {
    try {
      const [templateData, senderIdData] = await Promise.all([
        apiFetch('/sms/templates'),
        apiFetch('/sms/sender-id'),
      ])
      setTemplates(templateData?.data)
      setSenderIds(senderIdData?.data)
    } catch (error) {
      console.log(error)
      setError('Failed to load senderIds/template')
    }
  }

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
            handleFetch()
        }

        s.on('user:notification', handleNotification)

        return () => s.off('user:notification', handleNotification)
    }

  },[handleFetch])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setPending(true)
    try {
      const response = await apiFetch(
        '/sms',
        'POST',
        data
      )
      if(response?.success){
        Alert({
          title: 'Success',
          icon: 'success',
          text: response?.message,
          darkMode: true
        });
        form.reset()
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
        text: 'Something went wrong',
        darkMode: true
      });
    }finally{
      setPending(false)
    }
  }

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)?.content
    form.setValue("message", template || "");
  };

  const createTemplate = async (data: TemplateFormValues)=>{
    setPending(true)
    try {
      const response = await apiFetch(
        '/sms/templates',
        'POST',
        data
      )
      if(response?.success){
        handleFetch()
        Alert({
          title: 'Success',
          icon: 'success',
          text: response?.message,
          darkMode: true
        });
        setOpenTemplate(false)
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
        text: 'Something went wrong',
        darkMode: true
      });
    }finally{
      setPending(false)
    }
  }

  const createSenderId = async (data: SenderIdFormValues)=>{
    setPending(true)
    try {
      const response = await apiFetch(
        '/sms/sender-id',
        'POST',
        data
      )
      if(response?.success){
        handleFetch()
        Alert({
          title: 'Success',
          icon: 'success',
          text: response?.message,
          darkMode: true
        });
        setOpenSenderId(false)
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
        text: 'Something went wrong',
        darkMode: true
      });
    }finally{
      setPending(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Send SMS</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">

              <FormField
                name="senderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Sender ID</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a sender ID" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          senderIds.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.sender}{s.status !== 'APPROVED' ? ` (${s.status})` : ''}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      onClick={() => setOpenSenderId(true)}
                      variant="ghost" 
                      className="h-auto p-0 text-xs text-start text-red-500 
                      font-medium underline-offset-2 hover:underline max-w-fit"
                    >
                      Create new sender ID
                    </Button>
                  </FormItem>
                )}
              />

              <FormField
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Template</FormLabel>
                    <Select
                      onValueChange={(val) => {
                        field.onChange(val)
                        handleTemplateChange(val)
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a template(Optional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          templates.map((t) => (
                            <SelectItem key={t.id} value={t.id}>
                              {t.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      onClick={() => setOpenTemplate(true)}
                      variant="ghost" 
                      className="h-auto p-0 text-xs text-start text-red-500 
                      font-medium underline-offset-2 hover:underline max-w-fit"
                    >
                      Create new template
                    </Button>
                  </FormItem>
                )}
              />

              <FormField
                name="recipients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipients</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter phone numbers separated by commas or new lines"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      {recipientsList.length} recipient(s)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message..."
                        {...field}
                        rows={5}
                        maxLength={612}
                        onChange={(e) => {
                          field.onChange(e)
                          setCharCount(e.target.value.length)
                        }}
                      />
                    </FormControl>
                    <div className="text-xs text-muted-foreground flex justify-between mt-1">
                      <span>{charCount} characters</span>
                      <span>
                        ~{Math.ceil(charCount / 160)} SMS × {recipientsList.length} ={" "}
                        <strong>{smsCount}</strong> units
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="schedule"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Schedule SMS?</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {watchSchedule && (
                <FormField
                  name="scheduleAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule Date & Time</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP p") : "Pick date & time"}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent className="p-4 space-y-3 w-auto" align="start">
                          {/* Date Picker */}
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              if (!date) return;
                              // preserve time when changing date
                              const time = field.value ?? new Date();
                              date.setHours(time.getHours(), time.getMinutes());
                              field.onChange(date);
                            }}
                            fromDate={new Date()}
                            toDate={addDays(new Date(), 30)}
                          />

                          {/* Time Picker */}
                          <div className="flex gap-2">
                            <input
                              type="time"
                              className="border rounded-md px-2 py-1"
                              value={field.value ? format(field.value, "HH:mm") : ""}
                              onChange={(e) => {
                                const [h, m] = e.target.value.split(":");
                                const date = field.value ?? new Date();
                                date.setHours(Number(h), Number(m));
                                field.onChange(new Date(date));
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

            </CardContent>

            <CardFooter className="justify-end mt-8">
              <Button type="submit" disabled={!form.formState.isValid || pending}>
                {watchSchedule ? "Schedule SMS" : `${pending ? "Loading..." : "Send SMS"}`}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <CreateTemplateModal
        open={openTemplate}
        onClose={() => setOpenTemplate(false)}
        onSubmit={(data) => createTemplate(data)} 
        pending={pending}
      />

      <CreateSenderIdModal
        open={openSenderId}
        onClose={() => setOpenSenderId(false)}
        onSubmit={(data) => createSenderId(data)}
        pending={pending}
      />

    </div>
  )
}
