import { HomeNavbar } from "@/components/custom/home/Navbar";
import { HomeHeroSection } from "@/components/custom/home/hero-section/HeroSection";
import { HomeFeaturesSection } from "@/components/custom/home/features-section/FeaturesSection";

export default function Home() {
    return (
        <div className="min-h-screen h-full bg-background text-foreground scroll-smooth">
            <HomeNavbar />
            <HomeHeroSection />
            <HomeFeaturesSection />
        </div>
    );
}
