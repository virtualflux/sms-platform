"use client"

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Copy, Eye, EyeOff, Plus, Trash2 } from 'lucide-react'
import { apiFetch } from '@/lib/api/client'
import { Alert } from '../ui/alert'
import moment from 'moment'
import Loader from '../ui/Loader'

interface IApidata {
  id: string;
  label: string;
  createdAt: string;
  key: string;
  status: string;
}

interface IApistats {
  totalApiKeys: number;
  activeKeys: number;
  inactiveKeys: number;
  totalRequests: number;
  totalRequestsToday: number;
  lastUsed: string;
}

export default function Api() {
  const [data, setData] = useState<IApidata[]>([])
  const [stats, setStats] = useState<IApistats>()
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});


  useEffect(()=>{
    handleFetch()
  },[])

  const handleFetch = async (load = true) =>{
    if(load)setLoading(true)
    try {
      const response = await apiFetch(`/api`);

      if(response?.success){
        setData(response?.data?.apiKeys);
        setStats(response?.data?.stats);
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
    }
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    Alert({
      title: 'Done',
      icon: 'info',
      text: "API key copied",
      darkMode: true
    });
  }

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRevoke = async (id: string) => {
    setPending(true)
    try {
      const response = await apiFetch(
          `/api?id=${id}`,
          'DELETE',
      )
      if(response?.success){
        handleFetch(false)
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
        text: 'Something went wrong',
        darkMode: true
      });
    }finally{
      setPending(false)
    }
  }

  const onSubmit = async (data: any) => {
    setPending(true)
    try {
      const response = await apiFetch(
          '/api',
          'POST',
          data
      )
      if(response?.success){
        handleFetch(false)
        Alert({
          title: 'Success',
          icon: 'success',
          text: response?.message,
          darkMode: true
        });
        reset()
        setDialogOpen(false)
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

  if(loading) return <Loader/>

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">
            Manage your API keys and monitor your usage. You can view, revoke, or generate new API keys. Read our{' '}
            <a href="https://documenter.getpostman.com/view/34752920/2sB3dTrnW3" 
            target='_blank'
            className="text-primary underline">
              API Documentation
            </a>{' '}
            for details on how to integrate.
          </p>
          <div className="bg-muted/50 p-6 rounded-2xl shadow-sm mt-6">
            <h2 className="text-lg font-semibold mb-4">API Usage Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                <Label className="text-muted-foreground text-sm">Total API Requests</Label>
                <p className="text-xl font-semibold text-foreground">{stats?.totalRequests || 0}</p>
                </div>
                <div>
                <Label className="text-muted-foreground text-sm">Requests (Today)</Label>
                <p className="text-xl font-semibold text-foreground">{stats?.totalRequestsToday || 0}</p>
                </div>
                <div>
                <Label className="text-muted-foreground text-sm">Last Used</Label>
                <p className="text-xl font-semibold text-foreground">{stats?.lastUsed ? moment(stats?.lastUsed).format('DD MMM, YYYY') : 'N/A'}</p>
                </div>
                <div>
                <Label className="text-muted-foreground text-sm">Active Keys</Label>
                <p className="text-xl font-semibold text-foreground">{stats?.activeKeys || 0}</p>
                </div>
            </div>
        </div>
        </CardContent>
        <CardFooter>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" /> Generate New API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate API Key</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label>Token Name</Label>
                  <Input {...register('label', { required: true })} placeholder="e.g. My Mobile App" />
                </div>
                <div>
                  <Label>Allowed IP Address (optional)</Label>
                  <Input {...register('ip')} placeholder="e.g. 192.168.1.1" />
                </div>
                <p className="text-xs text-muted-foreground">
                  By generating this API token and performing operations through it, you acknowledge full responsibility
                  for all activities conducted using the token, whether by you or any third party. If your account has
                  not been authorized for international use, sending messages on behalf of foreign organizations or
                  international traffic via API is prohibited.
                </p>
                <DialogFooter>
                  <Button type="submit" disabled={pending}>
                    {pending ? 'Generating...' : 'Generate Key'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>{k.label}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    <span className="text-sm font-mono">
                      {visibleKeys[k.id] ? k.key : '••••••••••••'}
                    </span>
                  </TableCell>
                  <TableCell>{moment(k.createdAt).format('DD MMM, YYYY')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => toggleKeyVisibility(k.id)}
                    >
                      {visibleKeys[k.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleCopy(k.key)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" 
                    disabled={pending}
                    className='disabled:cursor-not-allowed'
                    onClick={() => handleRevoke(k.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
