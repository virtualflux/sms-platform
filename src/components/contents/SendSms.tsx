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
import { useState } from "react"
import { addDays } from "date-fns"

type FormData = {
  senderName: string;
  recipients: string;
  message: string;
  schedule: boolean;
  scheduleDate?: Date;
  template?: string;
};

const formSchema = z.object({
  senderName: z.string().max(11, "Sender name max 11 chars"),
  recipients: z.string().min(1, "Recipients required"),
  message: z.string().min(1, "Message required"),
  schedule: z.boolean(),
  scheduleDate: z.date().optional(),
  template: z.string().optional(),
})

export default function SendSMSForm() {
  const [charCount, setCharCount] = useState(0)
  const form = useForm<FormData>({
    defaultValues: {
      senderName: "",
      recipients: "",
      message: "",
      schedule: false,
      scheduleDate: undefined,
      template: undefined,
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Sending SMS:", data)
  }

  const handleTemplateChange = (templateId: string) => {
    const templates: Record<string, string> = {
      promo: "Get 20% off your next purchase! Show this message at checkout.",
      reminder: "Hello {{name}}, just a reminder of your appointment at {{time}}.",
      otp: "Your verification code is {{code}}. Expires in 10 minutes.",
    };
  
    form.setValue("message", templates[templateId] || "");
  };

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
                name="senderName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. MyCompany" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="template"
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
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a template" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="promo">Promo Offer</SelectItem>
                        <SelectItem value="reminder">Appointment Reminder</SelectItem>
                        <SelectItem value="otp">OTP Code</SelectItem>
                      </SelectContent>
                    </Select>
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
                  name="scheduleDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Schedule Date</FormLabel>
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
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromDate={new Date()}
                            toDate={addDays(new Date(), 30)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>

            <CardFooter className="justify-end mt-8">
              <Button type="submit" disabled={!form.formState.isValid}>
                {watchSchedule ? "Schedule SMS" : "Send SMS"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
