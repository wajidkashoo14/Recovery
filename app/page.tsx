"use client";

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Steps from "@/components/Steps";
import Qna from "@/components/Qna";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Services />
      <WhyUs />
      <Steps />
      <Qna />
      <Footer />
    </div>
  );
}
