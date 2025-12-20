
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
    CheckCircle2,
    Clock3,
    XCircle,
    Send,
    Wallet,
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { apiFetch } from "@/lib/api/client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { Alert } from "../ui/alert";

  
  const statusColor = {
    SUCCESS: "bg-green-100 text-green-700",
    PENDING: "bg-yellow-100 text-yellow-700",
    FAILED: "bg-red-100 text-red-700",
  }

  interface IStats {
    pending: number;
    sent: number;
    delivered: number;
    failed: number;
    total: number;
  }

  interface IWallet {
    balance: number
  }

  interface ITransaction {
    id: string;
    userId: string;
    type: string;
    amount: number;
    status: string;
    createAt: string;
  }

  interface IChart {
    name: string;
    sent: number;
  }

export default function Dashboard() {
  const [stats, setStats] = useState<IStats>()
  const [chartData, setChartData] = useState<IChart[]>([])
  const [wallet, setWallet] = useState<IWallet>()
  const [transaction, setTransaction] = useState<ITransaction[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    handleFetch()
  },[])

  const handleFetch = async () => {
    try {
      const response = await apiFetch(
        '/sms/overview',
      )
      if(response?.success){
        setStats(response?.data?.stats)
        setChartData(response?.data?.weeklyChart)
        setWallet(response?.data?.wallet)
        setTransaction(response?.data?.transactions)
      }else{
        Alert({
          title: 'Error',
          icon: 'error',
          text: 'Something went wrong',
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
      setLoading(false)
    }
  }

  if(loading)return <Loader/>

  return (
    <div className="p-6 space-y-6">
    
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card key={stats?.sent}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className={`text-sm font-medium text-blue-600`}>
                      Total Sent
                  </CardTitle>
                  <Send className="text-blue-600" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.sent}</div>
                </CardContent>
            </Card>
            <Card key={stats?.delivered}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className={`text-sm font-medium text-green-600`}>
                      Delivered
                  </CardTitle>
                  <CheckCircle2 className="text-green-600" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.delivered}</div>
                </CardContent>
            </Card>
            <Card key={stats?.pending}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className={`text-sm font-medium text-yellow-600`}>
                      Pending
                  </CardTitle>
                  <Clock3 className="text-yellow-600" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.pending}</div>
                </CardContent>
            </Card>
            <Card key={stats?.failed}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className={`text-sm font-medium text-red-600`}>
                      Failed
                  </CardTitle>
                  <XCircle className="text-red-600" size={24} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.failed}</div>
                </CardContent>
            </Card>
        </div>

        {/* Chart and Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>SMS Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData?.map((d, i) => ({
                  ...d,
                  id: i + 1,
                }))}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sent" fill="#6366F1" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            <Card >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" />
                SMS Wallet
                </CardTitle>
                {/* <Button variant="outline" size="sm">Top-Up</Button> */}
            </CardHeader>
            <CardContent className="flex justify-between gap-4 px-6 py-4">

            {/* Balance */}
            <div className="flex-1 flex flex-col items-center justify-center rounded-xl py-6 shadow-sm">
                <Wallet className="w-10 h-10 text-green-600 mb-2" />
                <p className="text-xl font-medium text-muted-foreground">Balance</p>
                <p className="text-3xl font-bold text-green-700">₦{wallet?.balance?.toLocaleString()}</p>
            </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
            <Button className="mt-2"
            onClick={()=>router.push('/dashboard/wallet/top-up')}>Top-Up</Button>
        </CardFooter>
    </Card>
        </div>

        {/* Recent Top-ups Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Top-Up Transactions</h2>
          <Button variant="link" className="text-primary px-0 h-auto"
          onClick={()=>router.push('/dashboard/wallet/history')}>View All</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transaction.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>{moment(tx.createAt).format("DD-MMM-YYYY")}</TableCell>
                  <TableCell>₦{tx.amount}</TableCell>
                  <TableCell>
                  <Badge className={statusColor[tx.status as keyof typeof statusColor]}>
                    {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
}
