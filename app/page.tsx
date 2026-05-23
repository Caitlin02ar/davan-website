import Image from "next/image";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import WhySection from "../components/WhySection";
import OurSystem from "../components/OurSystem";
import About from "../components/About";
import Performance from "../components/Performance";
import Credentials from "../components/Credentials";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <Hero/>
      <WhySection/>
      <OurSystem/>
      <About/>
      <Performance/>
      <Credentials/>
      <CTA/>
    </div>
  );
}
