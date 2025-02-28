"use client";

// import { HomeNavbar } from "@/components/custom/home/Navbar";
// import { HomeHeroSection } from "@/components/custom/home/hero-section/HeroSection";
import { FeatureDetailCard } from "@/components/custom/home/features-section/FeatureDetailCard";
import { FeatureMockup } from "@/components/custom/home/features-section/features/FeatureMockup";
import { FeaturesSection } from "@/components/custom/home/features-section/FeaturesSection";
import { SectionHeader } from "@/components/custom/home/SectionHeader";
import React from "react";

// export default function Home() {
//     return (
//         <div className="min-h-screen h-full bg-background text-foreground scroll-smooth">
//             <HomeNavbar />
//             <HomeHeroSection />
//         </div>
//     );
// }

export default function Home() {
    const [currentActiveStep, setCurrentActiveStep] = React.useState(1);
    return (
        <div className="min-h-screen h-full bg-background text-foreground scroll-smooth">
            {/* <FeatureMockup step={1} /> */}

            {/* <SectionHeader
                title="Features"
                description="Effortlessly organize your code with folders, tags, and languages, share public
                    folder links, and find snippets instantly with advanced search tools."
            /> */}
            {/* <FeatureDetailCard
                title="Create, Save & Organize Snippets"
                description="Effortlessly save your favorite code snippets and keep them neatly organized with folders, tags, and language-based categorization. Stay productive with everything you need at your fingertips."
                step={1}
                setCurrentActiveStep={setCurrentActiveStep}
            /> */}

            <FeaturesSection />
        </div>
    );
}
