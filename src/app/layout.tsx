import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/hoc/ReduxProvider";
import { NotificationProvider } from "@/hooks/NotificationProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Reliable SMS API & Bulk SMS Platform for Africa",
    template: "%s | SMS Platform",
  },

  description:
    "Send bulk, transactional, and OTP SMS across Africa with our fast, reliable SMS API. Developer-friendly, instant delivery, DND support, real-time reports, and affordable pricing.",

  keywords: [
    "SMS API",
    "Bulk SMS Nigeria",
    "Transactional SMS",
    "OTP SMS",
    "SMS Gateway Africa",
    "Bulk SMS Platform",
    "SMS Service Provider",
    "Send SMS Online",
    "SMS API for Developers",
    "Marketing SMS",
    "Business SMS Solution",
  ],

  authors: [{ name: "VFluxSMS" }],
  creator: "VFluxSMS",
  publisher: "VirtualFlux Integrated Services",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://vfluxsms.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vfluxsms.com",
    siteName: "VFluxSMS Platform",
    title: "Reliable SMS API & Bulk SMS Platform for Africa",
    description:
      "Send bulk, transactional, and OTP SMS across Africa with our fast and reliable SMS API. Instant delivery, real-time reports, and affordable pricing.",
    images: [
      {
        url: "https://vfluxsms.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Bulk SMS & SMS API Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Reliable SMS API & Bulk SMS Platform for Africa",
    description:
      "Send bulk, transactional, and OTP SMS with our developer-friendly SMS API. Fast delivery, real-time reports, and global reach.",
    images: ["https://vfluxsms.com/logo.png"],
    creator: "@yourtwitterhandle",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  category: "Technology",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <NotificationProvider>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
          </NotificationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
