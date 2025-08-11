"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


const dummySMSData = [
  {
    id: 1,
    phone: "+2347012345678",
    message: "Your OTP is 123456",
    sentAt: new Date(),
  },
  {
    id: 2,
    phone: "+2348098765432",
    message: "Your appointment is confirmed.",
    sentAt: new Date(),
  },
];

export default function SMSHistory() {
  const [search, setSearch] = useState("");

  const filteredSMS = dummySMSData.filter((sms) =>
    sms.phone.includes(search)
  );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">SMS History</h2>

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
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <Table className="w-full text-sm">
              <TableHeader className="bg-muted text-muted-foreground">
                <TableRow>
                  <TableHead className="px-4 py-2">Phone Number</TableHead>
                  <TableHead className="px-4 py-2">Message</TableHead>
                  <TableHead className="px-4 py-2">Date Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSMS.length > 0 ? (
                  filteredSMS.map((sms) => (
                    <TableRow key={sms.id} className="hover:bg-muted/50">
                      <TableCell className="px-4 py-3">{sms.phone}</TableCell>
                      <TableCell className="px-4 py-3">{sms.message}</TableCell>
                      <TableCell className="px-4 py-3">
                        {format(sms.sentAt, "dd MMM yyyy, HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4">
                      No messages found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
