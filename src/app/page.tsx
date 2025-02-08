"use client";

import { HomeCtaSection } from "@/components/custom/home/HomeCtaSection";
import { HomeFaqSection } from "@/components/custom/home/HomeFaqSection";
import { HomeFeatureSection } from "@/components/custom/home/HomeFeatureSection";
import { HomeFooter } from "@/components/custom/home/HomeFooter";
import { HomeHeroSection } from "@/components/custom/home/HomeHeroSection";
import { HomeNavbar } from "@/components/custom/home/HomeNavbar";
import { HomePricingSection } from "@/components/custom/home/HomePricingSection";

export default function Home() {
    return (
        <main className="min-h-screen h-full bg-background text-foreground font-sans scroll-smooth">
            <HomeNavbar />
            <HomeHeroSection />
            <HomeFeatureSection />
            <HomePricingSection />
            <HomeFaqSection />
            <HomeCtaSection />
            <HomeFooter />
        </main>
    );
}
