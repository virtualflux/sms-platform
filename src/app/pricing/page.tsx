import { Topbar } from "@/components/landing/TopBar"
import { Button } from "@/components/ui/button"

export default function Pricing() {
  return (
    <section className="min-h-screen pt-20 pb-24 px-4 bg-background">
        <Topbar/>
        <div className="max-w-6xl mx-auto text-center mt-18">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Affordable & Transparent SMS Pricing
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
            Pay only for what you use. No hidden charges. No expiry.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Local Pricing */}
            <div className="border rounded-2xl p-6 shadow-md bg-card">
                <h3 className="text-2xl font-semibold mb-2">🇳🇬 Local SMS (Nigeria)</h3>
                <p className="text-muted-foreground mb-4 text-sm">For messages sent within Nigeria</p>
                <div className="text-4xl font-bold mb-4">₦8.00 / SMS</div>
                <ul className="space-y-3 text-sm text-left mb-6">
                <li>✅ Instant delivery</li>
                <li>✅ Unicode & DND supported</li>
                <li>✅ Free Sender ID setup</li>
                <li>✅ Full delivery reports</li>
                </ul>
                <Button className="w-full">Start Sending</Button>
            </div>

            {/* International Pricing */}
            <div className="border rounded-2xl p-6 shadow-md bg-card">
                <h3 className="text-2xl font-semibold mb-2">🌍 International SMS</h3>
                <p className="text-muted-foreground mb-4 text-sm">For messages sent outside Nigeria</p>
                <div className="text-4xl font-bold mb-4">From ₦25.00 / SMS</div>
                <ul className="space-y-3 text-sm text-left mb-6">
                <li>✅ Global reach (200+ countries)</li>
                <li>✅ Smart routing for better delivery</li>
                <li>✅ Country-specific pricing</li>
                <li>✅ Enterprise support available</li>
                </ul>
                <Button variant="secondary" className="w-full">Create account</Button>
            </div>
            </div>

            <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm mb-2">Looking for high-volume discounts or white-label options?</p>
            <Button variant="outline">Start Sending</Button>
            </div>
        </div>
    </section>
  )
}
