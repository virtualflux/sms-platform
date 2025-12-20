import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}


const domain = process.env.NODE_ENV === "development" ? "localhost" : "";
const isClient = typeof window !== "undefined";

function getUserFromCookie() {
    if (!isClient) return {};
        const cookie = Cookies.get("user");
    if (cookie) {
        return JSON.parse(cookie);
    }

    return {

    };
}

const initialState: AuthState = {
    user: getUserFromCookie() || null,
    accessToken: Cookies.get("accessToken") || null,
    refreshToken: Cookies.get("refreshToken") || null,
    isAuthenticated: !!Cookies.get("accessToken"),
    loading: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials(
            state,
            action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
        ) {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            Cookies.set("user", JSON.stringify(user), {
                domain,
                secure: process.env.NODE_ENV !== "development",
                path: "/",
            });
            Cookies.set("refreshToken", JSON.stringify(refreshToken), {
                domain,
                secure: process.env.NODE_ENV !== "development",
                path: "/",
            });
            Cookies.set("accessToken", JSON.stringify(accessToken), {
                domain,
                secure: process.env.NODE_ENV !== "development",
                path: "/",
            });
        },

        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;

            Cookies.remove("user");
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        },

        updateAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            Cookies.set("accessToken", action.payload);
        },

        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },

        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    },
});

export const { setCredentials, logout, updateAccessToken, setUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
