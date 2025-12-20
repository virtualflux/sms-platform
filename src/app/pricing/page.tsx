import { Footer } from "@/components/landing/Footer";
import { Topbar } from "@/components/landing/TopBar"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "VFluxSMS Pricing – Affordable Bulk & API SMS Rates",

  description:
    "View transparent SMS pricing for bulk, transactional, and international SMS. Pay-as-you-go rates, no hidden fees, instant delivery, and country-specific pricing across Africa.",

  keywords: [
    "SMS pricing",
    "Bulk SMS price",
    "SMS API pricing",
    "Transactional SMS cost",
    "International SMS rates",
    "Bulk SMS Nigeria price",
    "Affordable SMS gateway",
    "SMS cost per country",
    "SMS platform pricing",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://vfluxsms.com/pricing",
  },

  openGraph: {
    type: "website",
    url: "https://vfluxsms.com/pricing",
    title: "SMS Pricing – Affordable Bulk & API SMS Rates",
    description:
      "Transparent and affordable SMS pricing for bulk, transactional, and international messaging. Country-based rates, no setup fees, and real-time delivery reports.",
    siteName: "VFluxSMS Platform",
    images: [
      {
        url: "https://vfluxsms.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Bulk SMS Pricing Table",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SMS Pricing – Affordable Bulk & API SMS Rates",
    description:
      "Check SMS pricing for bulk, transactional, and international messaging. Pay only for what you send. No hidden charges.",
    images: ["https://vfluxsms.com/logo.png"],
  },

  category: "Pricing",
};



async function fetchPricing() {
  const res = await fetch(`${process.env.NEXT_SERVER_URL}/wallet/pricing`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pricing");
  }

  const json = await res.json();
  return json.data;
}


type Pricing = {
  id: string;
  country: string;
  countryCode: string;
  network: string | null;
  price: number;
  route: "PROMOTIONAL" | "TRANSACTIONAL" | "INTERNATIONAL";
};

type GroupedPricing = {
  [country: string]: {
    countryCode: string;
    routes: {
      [route: string]: Pricing[];
    };
  };
};

function groupPricing(data: Pricing[]): GroupedPricing {
  return data.reduce((acc, item) => {
    if (!acc[item.country]) {
      acc[item.country] = {
        countryCode: item.countryCode,
        routes: {},
      };
    }

    if (!acc[item.country].routes[item.route]) {
      acc[item.country].routes[item.route] = [];
    }

    acc[item.country].routes[item.route].push(item);

    return acc;
  }, {} as GroupedPricing);
}


export const revalidate = 0;

export default async function Pricing() {
  const pricing = await fetchPricing();
  const grouped = groupPricing(pricing);

  return (
    <section className="min-h-screen px-4 bg-background">
      <Topbar />

      <div className="max-w-6xl mx-auto mt-18 mb-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Affordable & Transparent SMS Pricing
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Pay only for what you use. No hidden charges. No expiry.
          </p>
        </div>

        <div className="space-y-14">
          {Object.entries(grouped)?.length > 0 ?
            Object.entries(grouped)?.map(([country, info]) => (
              <div key={country}>
                <h2 className="text-2xl font-semibold mb-6">
                  {country} ({info.countryCode})
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {Object.entries(info.routes).map(([route, items]) => (
                    <div
                      key={route}
                      className="border rounded-2xl p-6 shadow-sm bg-card"
                    >
                      <h3 className="text-lg font-semibold mb-2">
                        {route.replace("_", " ")}
                      </h3>

                      <ul className="space-y-3 text-sm mb-4">
                        {items.map((item) => (
                          <li
                            key={item.id}
                            className="flex justify-between"
                          >
                            <span>
                              {item.network ?? "All Networks"}
                            </span>
                            <span className="font-medium">
                              ₦{item.price.toLocaleString()} / SMS
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* <Button className="w-full">
                        Start Sending
                      </Button> */}
                    </div>
                  ))}
                </div>
              </div>
            )) : (
              <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
                <div className="mb-4 text-5xl">📭</div>

                <h2 className="text-2xl font-semibold mb-2">
                  Pricing not available yet
                </h2>

                <p className="text-muted-foreground max-w-md mb-6">
                  We’re currently setting up our SMS pricing.  
                  Please check back shortly or contact support for more information.
                </p>

                <Button variant="outline">
                  Contact Support
                </Button>
              </div>
            )}
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm mb-2">
            Looking for high-volume discounts or white-label options?
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>

      <Footer/>
    </section>
  );
}

