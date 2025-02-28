import React from "react";
import { Icons } from "@/assets/icons";
import { ActionButton } from "@/components/ui/action-button";
import { HeroMockup } from "./HeroMockup";

export function HomeHeroSection() {
    return (
        <section className="w-full overflow-hidden px-4 flex flex-col items-center">
            <header className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                {/* logo with glow */}
                <div className="relative">
                    <Icons.LogoCodesnippify className="size-24 md:size-28 z-50" />
                    <div className="absolute inset-4 bg-glow blur-3xl"></div>
                </div>
                {/* title */}
                <div className="py-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tighter  m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-2xl">
                    <span className="inline-block">All Your Snippets,</span>
                    <span className="inline-block">Neatly Organized</span>
                </div>
                {/* description */}
                <p className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center">
                    Save, organize, and share your code snippets effortlessly. Focus on coding, not
                    searching.
                </p>
                {/* action button */}
                <ActionButton label="Get Started" href="/login" className="mt-8 w-fit px-10" />
            </header>
            {/* app mockup */}
            <HeroMockup lightImgPath="/app-light.png" darkImgPath="/app-dark.png" alt="app-demo" />
        </section>
    );
}
