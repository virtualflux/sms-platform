import { Card, CardContent } from "@/components/ui/card"

export function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Create an Account",
      description:
        "Sign up in seconds with your email or phone number. No complex onboarding — just the essentials to get started.",
    },
    {
      step: "2",
      title: "Top Up Your Wallet",
      description:
        "Fund your account using flexible payment options. We support instant top-ups for seamless sending.",
    },
    {
      step: "3",
      title: "Compose Your Message",
      description:
        "Use our simple interface to write your message, choose your audience, and personalize if needed.",
    },
    {
      step: "4",
      title: "Send or Schedule",
      description:
        "Send immediately or pick a future date and time. Your SMS will be delivered reliably and on time.",
    },
  ]

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <p className="text-muted-foreground mb-10">
          Getting started with our platform is quick and effortless. Follow these simple steps:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <Card key={step.step} className="rounded-2xl shadow-lg h-full">
              <CardContent className="p-6">
                <div className="text-primary text-2xl font-bold mb-2">Step {step.step}</div>
                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
