"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Copy, Plus, Trash2 } from 'lucide-react'

export default function Api() {
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'My App', key: 'sk_live_abcdefghijk123', createdAt: '2024-01-10' },
  ])

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset } = useForm()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key)
    window.alert('API key copied')
  }

  const handleRevoke = (id: string) => {
    setApiKeys(apiKeys.filter((k) => k.id !== id))
    window.alert('API key revoked')
  }

  const onSubmit = (data: any) => {
    setLoading(true)
    setTimeout(() => {
      const newKey = {
        id: Date.now().toString(),
        name: data.name,
        key: 'sk_live_' + Math.random().toString(36).substring(2, 18),
        createdAt: new Date().toISOString().split('T')[0],
      }
      setApiKeys([...apiKeys, newKey])
      window.alert('New API key generated')
      reset()
      setDialogOpen(false)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-muted-foreground text-sm">
            Manage your API keys and monitor your usage. You can view, revoke, or generate new API keys. Read our{' '}
            <a href="/docs/api" className="text-primary underline">
              API Documentation
            </a>{' '}
            for details on how to integrate.
          </p>
          <div className="bg-muted/50 p-6 rounded-2xl shadow-sm mt-6">
            <h2 className="text-lg font-semibold mb-4">API Usage Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                <Label className="text-muted-foreground text-sm">Total API Requests</Label>
                <p className="text-xl font-semibold text-foreground">1,243</p>
                </div>
                <div>
                <Label className="text-muted-foreground text-sm">Requests (Today)</Label>
                <p className="text-xl font-semibold text-foreground">36</p>
                </div>
                <div>
                <Label className="text-muted-foreground text-sm">Last Used</Label>
                <p className="text-xl font-semibold text-foreground">2025-08-29</p>
                </div>
                <div>
                <Label className="text-muted-foreground text-sm">Active Keys</Label>
                <p className="text-xl font-semibold text-foreground">{apiKeys.length}</p>
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
                  <Input {...register('name', { required: true })} placeholder="e.g. My Mobile App" />
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
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Key'}
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
              {apiKeys.map((k) => (
                <TableRow key={k.id}>
                  <TableCell>{k.name}</TableCell>
                  <TableCell className="truncate max-w-xs">
                    <span className="text-sm font-mono">{k.key}</span>
                  </TableCell>
                  <TableCell>{k.createdAt}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => handleCopy(k.key)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleRevoke(k.id)}>
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
