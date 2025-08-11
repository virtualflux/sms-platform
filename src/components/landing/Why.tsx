import { Card, CardContent } from "@/components/ui/card"

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Reliable Delivery",
      icon: "📲",
      description:
        "Our infrastructure ensures that your messages are delivered fast and reliably, every single time.",
    },
    {
      title: "User-Friendly Dashboard",
      icon: "🧭",
      description:
        "Easily navigate, send SMS, track campaigns, and manage your account from one intuitive interface.",
    },
    {
      title: "Developer-Friendly API",
      icon: "💻",
      description:
        "Integrate SMS into your apps effortlessly with our well-documented, flexible API.",
    },
    {
      title: "Affordable Pricing",
      icon: "💰",
      description:
        "Enjoy competitive rates and pay only for what you use. No hidden charges, ever.",
    },
    {
      title: "Dedicated Support",
      icon: "🤝",
      description:
        "Get responsive support whenever you need it — from onboarding to campaign optimization.",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <p className="text-muted-foreground mb-10">
          We’re not just another SMS platform — here’s why businesses trust us:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <Card key={idx} className="rounded-2xl shadow-md h-full">
              <CardContent className="p-6">
                <div className="text-4xl mb-3">{reason.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
