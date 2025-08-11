
import { FinalCta } from "@/components/landing/Cta";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ApiDocumentation } from "@/components/landing/OurApi";
import { Topbar } from "@/components/landing/TopBar";
import { WhyChooseUs } from "@/components/landing/Why";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full">
      <Topbar/>
      <Hero/>
      <Features/>
      <HowItWorks/>
      <WhyChooseUs/>
      <ApiDocumentation/>
      <FinalCta/>
      <Footer/>
    </div>
  );
}
