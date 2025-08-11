"use client"

import { Facebook, Twitter, Mail, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground text-sm py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-lg text-foreground mb-2">SMSPlatform</h4>
          <p>Your trusted partner for reliable messaging and developer-first SMS APIs.</p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Quick Links</h4>
          <ul className="space-y-2">
            {/* <li><a href="/features" className="hover:underline">Features</a></li> */}
            <li><a href="/docs/api" className="hover:underline">API Docs</a></li>
            <li><a href="/pricing" className="hover:underline">Pricing</a></li>
            <li><a href="/auth/login" className="hover:underline">Login</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Connect with us</h4>
          <div className="flex items-center gap-4">
            <a href="mailto:support@smsplatform.com"><Mail className="w-5 h-5 hover:text-foreground" /></a>
            <a href="https://github.com/your-org/sms-platform"><Github className="w-5 h-5 hover:text-foreground" /></a>
            <a href="#"><Facebook className="w-5 h-5 hover:text-foreground" /></a>
            <a href="#"><Twitter className="w-5 h-5 hover:text-foreground" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-muted-foreground">
        &copy; {new Date().getFullYear()} SMSPlatform. All rights reserved.
      </div>
    </footer>
  )
}
