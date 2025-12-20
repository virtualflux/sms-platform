import Container from '@/components/Container'
import Dashboard from '@/components/contents/Dashboard'
import React from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard – SMS Management & Analytics",

  description:
    "Manage SMS campaigns, view delivery reports, monitor wallet balance, sender IDs, and API usage from your centralized SMS dashboard.",

  robots: {
    index: false,
    follow: false,
    nocache: true,
  },

  openGraph: {
    type: "website",
    title: "Dashboard – SMS Management & Analytics",
    description:
      "Centralized dashboard to manage SMS campaigns, sender IDs, wallet balance, and delivery analytics.",
    siteName: "VFluxSMS Platform",
  },

  twitter: {
    card: "summary",
    title: "Dashboard – SMS Management & Analytics",
    description:
      "Control your SMS campaigns, sender IDs, and reports from one powerful dashboard.",
  },

  category: "Dashboard",
};

const page = () => {
  return (
    <Container>
        <Dashboard/>
    </Container>
  )
}

export default page