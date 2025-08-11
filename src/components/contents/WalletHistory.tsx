'use client';

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type WalletTransaction = {
  id: string;
  amount: number;
  status: "success" | "pending" | "failed";
  description: string;
  date: Date;
};

const mockWalletData: WalletTransaction[] = [
  {
    id: "TXN001",
    amount: 1000,
    status: "success",
    description: "Wallet funding of 1000",
    date: new Date("2025-07-01"),
  },
  {
    id: "TXN002",
    amount: 500,
    status: "success",
    description: "Wallet funding of 500",
    date: new Date("2025-07-15"),
  },
  {
    id: "TXN003",
    amount: 300,
    status: "pending",
    description: "Wallet funding of 300",
    date: new Date("2025-07-25"),
  },
];

export default function WalletHistory() {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const filteredData = mockWalletData.filter((txn) => {
    const inDateRange =
      (!fromDate || txn.date >= fromDate) && (!toDate || txn.date <= toDate);
    return inDateRange;
  });

  const exportCSV = () => {
    const headers = ["Transaction ID", "Amount", "Type", "Status", "Description", "Date"];
    const rows = filteredData.map((txn) => [
      txn.id,
      txn.amount,
      txn.status,
      txn.description,
      format(txn.date, "yyyy-MM-dd"),
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `wallet_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">


      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Wallet History</h1>
        <Button onClick={exportCSV} variant="outline" className="gap-2">
          <DownloadIcon className="w-4 h-4" /> Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* From Date */}
        <div>
          <label className="text-sm font-medium">From Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !fromDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? format(fromDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={fromDate} onSelect={setFromDate} />
            </PopoverContent>
          </Popover>
        </div>

        {/* To Date */}
        <div>
          <label className="text-sm font-medium">To Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !toDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? format(toDate, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.amount.toLocaleString()}</TableCell>
                  <TableCell className="capitalize">{txn.status}</TableCell>
                  <TableCell>{txn.description}</TableCell>
                  <TableCell>{format(txn.date, "PPP")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-6">
                  No wallet history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
