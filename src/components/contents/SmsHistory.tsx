"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { apiFetch } from "@/lib/api/client";
import { Alert } from "../ui/alert";
import { AdvancedFilter } from "../AdvanceFilter";
import { Pagination } from "../Pagination";
import Loader from "../ui/Loader";
import moment from 'moment'

interface ISmsData {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  cost: number;
  providerMsgId: string;
  status: string;
  createdAt: string;
  deliveredAt: string;
  sentAt: string;
}

export default function SMSHistory() {
  const [data, setData] = useState<ISmsData[]>([])
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
      const response = await apiFetch(`/sms?${queryString}`);

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

  if(loading && !loaded) return <Loader/>

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">SMS History</h2>

      <div>
        <AdvancedFilter
          title="SMS History Filter"
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
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <Table className="w-full text-sm">
              <TableHeader className="bg-muted text-muted-foreground">
                <TableRow>
                  <TableHead className="px-4 py-2">Phone Number</TableHead>
                  <TableHead className="px-4 py-2">Message</TableHead>
                  <TableHead className="px-4 py-2">Cost</TableHead>
                  <TableHead className="px-4 py-2">Date Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length > 0 ? (
                  data.map((sms) => (
                    <TableRow key={sms.id} className="hover:bg-muted/50">
                      <TableCell className="px-4 py-3">{sms.recipient}</TableCell>
                      <TableCell className="px-4 py-3">{sms.message}</TableCell>
                      <TableCell className="px-4 py-3">{sms.cost}</TableCell>
                      <TableCell className="px-4 py-3">
                        {moment(sms.sentAt).format('DD MMM, YYYY, hh:mm')}
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

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => handlePageChange(p)}
      />
    </div>
  );
}
