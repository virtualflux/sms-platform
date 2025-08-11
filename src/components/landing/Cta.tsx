"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCta() {
  return (
    <section className="py-20 bg-background text-center px-4">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Power Your Messaging?
            </h2>
            <p className="text-lg mb-6">
                Start sending SMS in seconds. Create an account and experience fast, reliable, and secure communication.
            </p>
            <Button variant="secondary" size="lg" asChild>
                <a href="/auth/accounts/signup">
                    Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                </a>
            </Button>
        </div>
    </section>
  )
}
