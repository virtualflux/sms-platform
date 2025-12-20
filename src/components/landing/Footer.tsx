"use client"

import { Facebook, Twitter, Mail, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground text-sm py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-bold text-lg text-foreground mb-2">VFluxSMS</h4>
          <p>Your trusted partner for reliable messaging and developer-first SMS APIs.</p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Quick Links</h4>
          <ul className="space-y-2">
            {/* <li><a href="/features" className="hover:underline">Features</a></li> */}
            <li><a href="https://documenter.getpostman.com/view/34752920/2sB3dTrnW3" 
            target="_blank"
            className="hover:underline">API Docs</a></li>
            <li><a href="/pricing" className="hover:underline">Pricing</a></li>
            <li><a href="/auth/accounts/login" className="hover:underline">Login</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-2">Connect with us</h4>
          <div className="flex items-center gap-4">
            <a href="mailto:support@vfluxsms.com"><Mail className="w-5 h-5 hover:text-foreground" /></a>
            <a href="#"><Github className="w-5 h-5 hover:text-foreground" /></a>
            <a href="#"><Facebook className="w-5 h-5 hover:text-foreground" /></a>
            <a href="#"><Twitter className="w-5 h-5 hover:text-foreground" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-muted-foreground">
        &copy; {new Date().getFullYear()} VFluxSMS. All rights reserved.
      </div>
    </footer>
  )
}
