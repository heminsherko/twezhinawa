"use client";

import Hero from "@/components/Hero";
import SectionCard from "@/components/SectionCard";
import SourceFinder from "@/components/SourceFinder";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 md:gap-24 pb-12 md:pb-20 pt-2 md:pt-4 w-full overflow-hidden">
      
      {/* بەشی پێشوازی و ناساندن */}
      <Hero />
      
      {/* بەشی خزمەتگوزارییەکان و کاردەکان */}
      <SectionCard />
      
      {/* بەشی ئامرازەکان */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        <SourceFinder />
      </div>

    </div>
  );
}