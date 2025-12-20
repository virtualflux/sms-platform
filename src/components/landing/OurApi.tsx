"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

export function ApiDocumentation() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Developer-Friendly API
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
          Easily integrate SMS features into your app with our robust, well-documented REST API. Whether you're sending OTPs, alerts, or marketing messages, we’ve made it seamless for developers to connect and deploy.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🧩</div>
              <h3 className="text-lg font-semibold mb-1">Comprehensive Docs</h3>
              <p className="text-sm text-muted-foreground">
                Full documentation with real-world examples, test cases, and easy-to-follow guides.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-3xl mb-2">🔑</div>
              <h3 className="text-lg font-semibold mb-1">Secure API Keys</h3>
              <p className="text-sm text-muted-foreground">
                Generate and manage secure API tokens with IP restrictions and audit logs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-3xl mb-2">⚙️</div>
              <h3 className="text-lg font-semibold mb-1">Powerful Endpoints</h3>
              <p className="text-sm text-muted-foreground">
                From sending SMS to checking delivery reports — our endpoints give you full control.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10">
          <Button size="lg" className="text-base" asChild>
            <a href="https://documenter.getpostman.com/view/34752920/2sB3dTrnW3" 
            target="_blank" rel="noopener noreferrer">
              View API Documentation <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
