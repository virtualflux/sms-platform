import Login from '@/components/contents/auth/Login'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – Access Your VFluxSMS Dashboard",

  description:
    "Securely log in to VFluxSMS account to manage campaigns, sender IDs, wallet balance, delivery reports, and API usage.",

  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

  openGraph: {
    type: "website",
    title: "Login – VFluxSMS Platform",
    description:
      "Log in to your VFluxSMS account to manage messaging campaigns, sender IDs, analytics, and wallet balance securely.",
    siteName: "VFluxSMS",
  },

  twitter: {
    card: "summary",
    title: "Login – VFluxSMS Platform",
    description:
      "Secure login to your VFluxSMS dashboard for managing campaigns and delivery reports.",
  },

  category: "Authentication",
};

const page = () => {
  return <Login/>
}

export default page