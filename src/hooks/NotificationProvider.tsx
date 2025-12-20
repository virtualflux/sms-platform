"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { initializeSocket, disconnectSocket } from "@/lib/socket";
import { useAppSelector } from "@/store/hooks";
import { INotification } from "@/components/TopBar";
import { apiFetch } from "@/lib/api/client";

const NotificationContext = createContext<any>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAppSelector((state) => state.auth);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const socketRef = useRef<any>(null);
    const fetchedRef = useRef(false);

    const notificationSound = useRef(
        typeof Audio !== "undefined" ? new Audio("/notification.wav") : null
    );

    const fetchNotifications = async () => {
        try {
        const res = await apiFetch("/notification");
        if (res?.success) {
            setNotifications(res.data);
        }
        } catch (e) {
        console.error(e);
        }
    };

    useEffect(() => {
        if (!user?.id || fetchedRef.current) return;

        fetchedRef.current = true;
        fetchNotifications();

        socketRef.current = initializeSocket(user.id);

        socketRef.current.on("user:notification", (data: any) => {
        fetchNotifications();
        notificationSound.current?.play().catch(() => {});
        });

        return () => {
        disconnectSocket();
        fetchedRef.current = false;
        };
    }, [user?.id]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications, fetchNotifications }}>
        {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => useContext(NotificationContext);
