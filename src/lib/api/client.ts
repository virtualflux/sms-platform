"use client";
import Cookies from "js-cookie";

let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

async function refreshAccessToken() {
    if (isRefreshing) {
        return new Promise(resolve => refreshQueue.push(resolve));
    }

    isRefreshing = true;

    const refreshToken = Cookies.get("refreshToken")?.replace(/"/g, '')
    const user = JSON.parse(Cookies.get("user") as any)
    if (!refreshToken || !user) throw new Error("Not authenticated");

    const res = await fetch("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken, userId: user?.id })
    });
    
    const data = await res.json();

    if(!data?.success){
        Cookies.remove("user");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = '/auth/accounts/login'
        throw new Error("Session expired");
    }

    const newAccessToken = data.data.accessToken;
    const newRefreshToken = data.data.refreshToken;

    Cookies.set("accessToken", JSON.stringify(newAccessToken));
    Cookies.set("refreshToken", JSON.stringify(newRefreshToken));

    isRefreshing = false;
    refreshQueue.forEach(cb => cb(newAccessToken));
    refreshQueue = [];

    return newAccessToken;
}

export async function apiFetch<T = any>(
    endpoint: string,
    method: string = "GET",
    body?: any
): Promise<T> {

    let token = Cookies.get("accessToken")

    async function request() {
        return fetch(`/api${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? token : "",
        },
        body: body ? JSON.stringify(body) : undefined,
        });
    }

    let res = await request();
    let result = await res.json() as any
    //If access token expired → auto refresh
    if (
        res.status === 401 ||
        res.status === 403 ||
        result?.statusCode === 401 ||
        result?.statusCode === 403
    ) {
        try {
            token = await refreshAccessToken();
            res = await request();
            result = await res.json();
        } catch {
            window.location.href = '/auth/accounts/login'
            throw new Error("Authentication expired. Login again.");
        }
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "API request failed");
    }

    return result
}
