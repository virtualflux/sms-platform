import Signup from '@/components/contents/auth/Signup'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register – Access VFluxSMS Dashboard",

  description:
    "Signup to to VFluxSMS account to manage campaigns, sender IDs, wallet balance, delivery reports, and API usage.",

  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

  openGraph: {
    type: "website",
    title: "Signup – VFluxSMS Platform",
    description:
      "Signup to VFluxSMS account to manage messaging campaigns, sender IDs, analytics, and wallet balance securely.",
    siteName: "VFluxSMS",
  },

  twitter: {
    card: "summary",
    title: "Signup – VFluxSMS Platform",
    description:
      "Signup to VFluxSMS dashboard for managing campaigns and delivery reports.",
  },

  category: "Authentication",
};

const page = () => {
  return <Signup/>
}

export default page