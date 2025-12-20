"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { Alert } from "../ui/alert";

type FormData = {
  threshold: string;
  email: string;
  phone: string;
  interval: string;
};

type Reminder = {
  id: string;
  threshold: string;
  emails: string;
  phones: string;
  interval: string;
  createdAt: string;
};

const LowBalanceReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      threshold: "",
      email: "",
      phone: "",
      interval: "",
    },
  });

  useEffect(()=>{
    handleFetch()
  },[])

  const handleFetch = async () => {
    try {
      const response = await apiFetch(
        '/balance-reminder'
      )
      if(response?.success){
        setReminders(response?.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const response = await apiFetch(
        '/balance-reminder',
        'POST',
        {
          ...data,
          threshold: Number(data.threshold)
        }
      )
      if(response?.success){
        handleFetch()
        reset();
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
      setLoading(false)
    }
  };

  const deleteReminder = async (id: string) => {
    setPending(true)
    try {
      const response = await apiFetch(
        `/balance-reminder?id=${id}`,
        'DELETE',
      )
      if(response?.success){
        handleFetch()
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
  };

  return (
    <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">Low Balance Reminder</h2>
        <Card>
            <CardHeader>
            <CardTitle>Low Balance Reminder</CardTitle>
            </CardHeader>
            <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2">
                <Label htmlFor="threshold">Threshold (₦)</Label>
                <Input
                    id="threshold"
                    type="number"
                    min={100}
                    placeholder="e.g. 1000"
                    {...register("threshold", { required: "Threshold is required" })}
                />
                <p className="text-sm text-muted-foreground">
                    The minimum wallet balance at which you want to receive a low balance alert.
                </p>
                {errors.threshold && (
                    <p className="text-sm text-red-500">{errors.threshold.message}</p>
                )}
                </div>

                <div className="space-y-2">
                <Label htmlFor="email">Email Recipients</Label>
                <Textarea
                    id="email"
                    placeholder="e.g. admin@example.com, finance@example.com"
                    {...register("email")}
                />
                <p className="text-sm text-muted-foreground">
                    Comma-separated email addresses (up to 10). Leave blank to disable email alerts.
                </p>
                </div>

                <div className="space-y-2">
                <Label htmlFor="phone">Phone Numbers</Label>
                <Textarea
                    id="phone"
                    placeholder="e.g. 08012345678, 08087654321"
                    {...register("phone")}
                />
                <p className="text-sm text-muted-foreground">
                    Comma-separated phone numbers (up to 10). Leave blank to disable SMS alerts.
                </p>
                </div>

                <div className="space-y-2">
                <Label htmlFor="interval">Reminder Interval</Label>
                <Select
                    onValueChange={(val) => setValue("interval", val)}
                    defaultValue={watch("interval")}
                >
                    <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select interval" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="HOURLY">Hourly</SelectItem>
                    <SelectItem value="ONCE">Once</SelectItem>
                    <SelectItem value="DAILY">Daily</SelectItem>
                    <SelectItem value="WEEKLY">Weekly</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                    How often the alert should be repeated until you top up your wallet.
                </p>
                </div>

                <Button type="submit"
                disabled={loading}>{loading ? "Loading...." : "Save Reminder Settings"}</Button>
            </form>
            </CardContent>
        </Card>

        {/* Table of existing reminders */}
        <Card className="mt-8">
            <CardHeader>
            <CardTitle>Current Reminder Rules</CardTitle>
            </CardHeader>
            <CardContent>
            {reminders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No reminders configured yet.</p>
            ) : (
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Interval</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reminders.map((reminder) => (
                    <TableRow key={reminder.id}>
                        <TableCell>₦{reminder.threshold}</TableCell>
                        <TableCell>{reminder.emails || "-"}</TableCell>
                        <TableCell>{reminder.phones || "-"}</TableCell>
                        <TableCell>{reminder.interval}</TableCell>
                        <TableCell className="text-right">
                        <Button
                            size="sm"
                            variant="outline"
                            disabled={pending}
                            onClick={() => deleteReminder(reminder.id)}
                        >
                            {pending ? "Loading..." : "Delete"}
                        </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            )}
            </CardContent>
        </Card>
    </div>
  );
};

export default LowBalanceReminder;
