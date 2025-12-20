'use client'

import Image from "next/image";
import ModeToggle from "./ModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell } from "lucide-react"
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { Button } from "./ui/button";
import { apiFetch } from "@/lib/api/client";
import { Alert } from "./ui/alert";
import { useState } from "react";

export interface INotification {
    id: string;
    title: string;
    message: string;
    type: string;
    data: any;
    createdAt: string;
    read: boolean;
}
export default function Topbar({
    notifications,
    fetchNotifications
}:{
    notifications: INotification[],
    fetchNotifications: ()=>void;
}) {
    const {user} = useAppSelector((state) => state.auth)
    const [pending, setPending] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = ()=>{
        dispatch(logout())
    }

    const handleMarkAll = async () => {
        setPending(true)
        try {
            const response = await apiFetch(
                '/notification',
                'PUT'
            )
            if(response?.success){
                fetchNotifications()
            }else{
                Alert({
                    title: "Error",
                    icon: "error",
                    text: response?.message || "Something went wrong",
                });
            }
        } catch (error: any) {
            console.log(error)
            Alert({
                title: "Error",
                icon: "error",
                text: error.message || "Something went wrong",
            });
        }finally{
            setPending(false)
        }
    }

    return (
        <header className="fixed top-0 right-0 md:left-64 left-0 px-6 
        py-4 border-b bg-background flex items-center justify-between md:z-[999]">
        
            <h1 className="hidden md:block text-lg font-medium">Welcome {user?.name}</h1>
            <span className="md:hidden block"></span>

            <div className="flex items-center gap-4">
                <ModeToggle />

                {/* Notification Dropdown */}
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="relative focus:outline-none">
                    <Bell className="w-6 h-6 hover:text-gray-800" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-3 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {unreadCount}
                        </span>
                    )}
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" 
                className="w-80 p-2 z-[100000] space-y-2 max-h-[400px] overflow-y-auto">

                    {notifications.length === 0 && (
                        <DropdownMenuItem>No notifications</DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                        <div className="w-full flex items-center justify-between border-b">
                            <span className="text-xs">
                                Notifications
                            </span>
                            {notifications?.length > 0 && 
                            <Button variant={'ghost'} 
                            onClick={handleMarkAll}
                            disabled={pending}
                            className="text-xs text-red-500 disabled:opacity-40 disabled:cursor-not-allowed">
                                Mark all as read
                            </Button>}
                        </div>
                    </DropdownMenuItem>
                    {notifications.map((n) => (
                        <DropdownMenuItem key={n.id} className={`flex flex-col items-start border-b border-gray-600 ${!n.read ? '' : ''}`}>
                            <span className="font-medium">{n.title}</span>
                            <span className="text-sm">{n.message}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile Dropdown */}
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer" >
                    <AvatarImage 
                        src="/images/avatar-png.png" 
                        alt="User" 
                        className="object-cover cursor-pointer"
                    />
                    <AvatarFallback>
                        {user?.name}
                    </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="z-[1000]">
                    <DropdownMenuItem onClick={() => router.push('/dashboard/settings/profile')}>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    );
}
