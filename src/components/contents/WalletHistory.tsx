'use client';

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Loader from "../ui/Loader";
import { Alert } from "../ui/alert";
import { apiFetch } from "@/lib/api/client";
import { AdvancedFilter } from "../AdvanceFilter";
import { Pagination } from "../Pagination";
import moment from "moment";

type WalletTransaction = {
  id: string;
  amount: number;
  status: "SUCCESS" | "PENDING" | "FAILED";
  type: "CREDIT" | "DEBIT" | "TOPUP";
  reference: string;
  createdAt: string;
  
};


export default function WalletHistory() {
  const [data, setData] = useState<WalletTransaction[]>([])
  const [query, setQuery] = useState<any>({}); 
  const [page, setPage] = useState(1);  
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
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
        const response = await apiFetch(`/transaction?${queryString}`);
  
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
  
    const exportCSV = () => {
      const headers = ["Transaction ID", "Amount", "Type", "Status", "Reference", "Date"];
      const rows = data.map((txn) => [
        txn.id,
        txn.amount,
        txn.type,
        txn.status,
        txn.reference,
        moment(txn.createdAt).format("yyyy-MM-dd"),
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

    if(loading && !loaded) return <Loader/>


  return (
    <div className="p-6 space-y-6">


      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Wallet History</h1>
        <Button onClick={exportCSV} variant="outline" className="gap-2">
          <DownloadIcon className="w-4 h-4" /> Export
        </Button>
      </div>

      <div>
        <AdvancedFilter
          title="Trannsaction History Filter"
          onApply={handleFilter}
          fields={[
            {type:"text", name:"reference", label:"Search"},
            {type:"select", name:"status", label:"Status", options:[
              {label:"Pending", value:"PENDING"},
              {label:"Success", value:"SUCCESS"},
              {label:"Failed", value:"FAILED"},
            ]},
            {type:"dateRange", name:"date", label:"Date Range"},
          ]}
        />
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Amount (₦)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="uppercase">{txn?.id?.slice(0,9)}</TableCell>
                  <TableCell>₦{txn.amount.toLocaleString()}</TableCell>
                  <TableCell className="capitalize">{txn.status}</TableCell>
                  <TableCell className="capitalize">{txn.type}</TableCell>
                  <TableCell>{txn.reference}</TableCell>
                  <TableCell>{moment(txn.createdAt).format("DD MMM, YYYY")}</TableCell>
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => handlePageChange(p)}
      />
    </div>
  );
}
