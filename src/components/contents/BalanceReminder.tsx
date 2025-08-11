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
import { useState } from "react";

type FormData = {
  threshold: string;
  email: string;
  phone: string;
  interval: string;
};

type Reminder = {
  id: string;
  threshold: string;
  email: string;
  phone: string;
  interval: string;
};

const LowBalanceReminder = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      threshold: "1000",
      email: "admin@example.com, finance@example.com",
      phone: "08012345678, 08098765432",
      interval: "daily",
    },
  ]);

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

  const onSubmit = (data: FormData) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...data,
    };
    setReminders((prev) => [...prev, newReminder]);
    reset();
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
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
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="6hours">Every 6 Hours</SelectItem>
                    <SelectItem value="12hours">Every 12 Hours</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                    How often the alert should be repeated until you top up your wallet.
                </p>
                </div>

                <Button type="submit">Save Reminder Settings</Button>
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
                        <TableCell>{reminder.email || "-"}</TableCell>
                        <TableCell>{reminder.phone || "-"}</TableCell>
                        <TableCell>{reminder.interval}</TableCell>
                        <TableCell className="text-right">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteReminder(reminder.id)}
                        >
                            Delete
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
