// components/hero.tsx

"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-muted mt-14 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
            {/* Text Content */}
            <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground">
                    Reliable, Fast & Secure SMS Messaging Platform
                </h1>
                <p className="text-muted-foreground text-lg">
                    Send bulk SMS, schedule messages, monitor API usage, and get instant top-ups — all from a modern, easy-to-use dashboard.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button size="lg">Get Started</Button>
                    <Button variant="outline" size="lg">Explore Features</Button>
                </div>
            </div>

            {/* Image Content */}
            <div className="relative w-full h-80 md:h-[400px] rounded-xl overflow-hidden shadow-xl border bg-background">
                <Image
                    src="/images/dashboard-preview.png"
                    alt="Dashboard Preview"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    </section>
  );
}
