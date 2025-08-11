
'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
    BarChart as ChartIcon,
    CheckCircle2,
    Clock3,
    XCircle,
    Send,
    Wallet, ArrowDownCircle, ArrowUpCircle
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


const smsStats = [
    {
      label: 'Total Sent',
      value: 1200,
      icon: <Send className="text-blue-600" size={24} />,
      color: 'text-blue-600',
    },
    {
      label: 'Delivered',
      value: 1100,
      icon: <CheckCircle2 className="text-green-600" size={24} />,
      color: 'text-green-600',
    },
    {
      label: 'Pending',
      value: 50,
      icon: <Clock3 className="text-yellow-500" size={24} />,
      color: 'text-yellow-600',
    },
    {
      label: 'Failed',
      value: 50,
      icon: <XCircle className="text-red-600" size={24} />,
      color: 'text-red-600',
    },
];

const smsData = [
  { name: 'Mon', sent: 200 },
  { name: 'Tue', sent: 150 },
  { name: 'Wed', sent: 300 },
  { name: 'Thu', sent: 250 },
  { name: 'Fri', sent: 100 },
  { name: 'Sat', sent: 180 },
  { name: 'Sun', sent: 220 },
];

const topUps = [
    {
      date: "2025-07-25",
      amount: "₦5,000",
      status: "Successful",
      method: "Card",
    },
    {
      date: "2025-07-22",
      amount: "₦3,500",
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      date: "2025-07-20",
      amount: "₦2,000",
      status: "Failed",
      method: "Wallet",
    },
  ]
  
  const statusColor = {
    Successful: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
  }

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
    
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smsStats.map((stat) => (
            <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className={`text-sm font-medium ${stat.color}`}>
                    {stat.label}
                </CardTitle>
                {stat.icon}
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
            </Card>
            ))}
        </div>

        {/* Chart and Balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>SMS Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                <BarChart data={smsData}>
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
                <p className="text-3xl font-bold text-green-700">₦12,300</p>
            </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-4">
            <Button className="mt-2">Top-Up</Button>
        </CardFooter>
    </Card>
        </div>

        {/* Recent Top-ups Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Top-Up Transactions</h2>
          <Button variant="link" className="text-primary px-0 h-auto">View All</Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topUps.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                  <Badge className={statusColor[tx.status as keyof typeof statusColor]}>
                    {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{tx.method}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

    </div>
  );
}
