"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight, Wallet, CreditCard, Clock, X } from "lucide-react";
import { Alert } from "../ui/alert";
import { apiFetch } from "@/lib/api/client";

export default function WalletTopUp() {
    const [amount, setAmount] = useState("");
    const [authUrl, setAuthUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    
    const handleTopUp = async () => {
        if (!amount) return Alert({
            title: 'Info',
            icon: 'info',
            text: "Enter amount to proceed",
            darkMode: true
        });;
        setLoading(true)
        try {
            const response = await apiFetch(
            `/transaction`,
            'POST',
            {amount}
            )
            if(response?.success){
                setAuthUrl(response?.data?.authorization_url);
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
                text: "Something went wrong, try again later!",
                darkMode: true
            });
        }finally{
            setLoading(false)
        }
    };

    const handleCloseModal = () => {
        setAuthUrl(null);
        setAmount('')
    };

  return(
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-2">
            <Wallet className="w-7 h-7 text-primary" />
            <h2 className="text-3xl font-bold">Fund Wallet</h2>
        </div>
        <p className="text-muted-foreground">Add money to your wallet using Paystack.</p>

        <Card>
            <CardHeader>
            <CardTitle>Top Up Balance</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
            
            {/* Input */}
            <div className="space-y-2">
                <Label>Enter Amount (₦)</Label>
                <Input
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className=""
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <Button 
                className="w-full font-semibold"
                onClick={handleTopUp}
                >
                    {loading ? "Initiating...." : "Fund Wallet"} <ArrowRight className="w-4" />
                </Button>
            </div>
            </CardContent>
        </Card>

        {/* Paystack Modal */}
        {authUrl && (
            <Dialog open={!!authUrl} onOpenChange={handleCloseModal}>
            <DialogContent className="max-w-3xl w-full p-0 bg-transparent shadow-none">
                <div className="relative w-full h-[600px]">
                {/* Close button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 text-red-500 text-2xl"
                    onClick={handleCloseModal}
                >
                    <X className="text-2xl"/>
                </Button>

                {/* Iframe */}
                <iframe
                    src={authUrl}
                    className="w-full h-full border-none rounded-lg"
                    title="Paystack Payment"
                />
                </div>
            </DialogContent>
            </Dialog>
        )}

    </div>
)
}
