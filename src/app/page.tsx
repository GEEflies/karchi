import Hero from "@/components/Hero";

import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Portfolio />
      <Services />
      <About />
    </div>
  );
}
