// components/features.tsx

export function Features() {
    const features = [
      {
        title: "Send SMS Instantly",
        icon: "📨",
        description:
          "Deliver important messages to your customers or audience in real time. No delays, no bottlenecks — just fast, direct communication.",
      },
      {
        title: "Bulk Messaging",
        icon: "📦",
        description:
          "Reach thousands with a single click. Upload your contact list and send personalized messages at scale with ease.",
      },
      {
        title: "Scheduled Messages",
        icon: "🕒",
        description:
          "Plan ahead and automate your outreach. Schedule messages to go out exactly when your audience needs to see them.",
      },
      {
        title: "API Access (for Developers)",
        icon: "🔐",
        description:
          "Integrate SMS into your website or application using our robust and well-documented API — built with developers in mind.",
      },
      {
        title: "Smart Delivery Insights",
        icon: "📊",
        description:
          "Track delivery rates, click-throughs, and message performance with real-time analytics designed to help you optimize engagement.",
      },
      {
        title: "Low Balance Alerts",
        icon: "⚠️",
        description:
          "Never run out of credits unexpectedly. Get timely notifications when your balance is low so you can top up without disruptions.",
      },
    ];
  
    return (
      <section className="bg-background py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Powerful SMS Features at Your Fingertips
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to send SMS the smart way — fast, reliable, and built for scale.
          </p>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-muted shadow-sm hover:shadow-md transition text-left"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  