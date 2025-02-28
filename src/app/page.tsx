import { HomeNavbar } from "@/components/custom/home/Navbar";
import { HomeHeroSection } from "@/components/custom/home/hero-section/HeroSection";
import { HomeFeaturesSection } from "@/components/custom/home/features-section/FeaturesSection";
import { HomePricingSection } from "@/components/custom/home/pricing-section/PricingSection";
import { HomeFaqSection } from "@/components/custom/home/FaqSection";
import { HomeCallToActionSection } from "@/components/custom/home/CallToActionSection";
export default function Home() {
    return (
        <div className="min-h-screen h-full bg-background text-foreground scroll-smooth">
            <HomeNavbar />
            <HomeHeroSection />
            <HomeFeaturesSection />
            <HomePricingSection />
            <HomeFaqSection />
            <HomeCallToActionSection />
        </div>
    );
}

// export default function Home() {
//     return (
//         <div className="min-h-screen h-full bg-background text-foreground scroll-smooth flex flex-col items-center justify-center">

//         </div>
//     );
// }
