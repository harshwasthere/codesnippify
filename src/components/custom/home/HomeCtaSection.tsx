import { Icons } from "@/assets/icons";
import { CtaButton } from "@/components/ui/cta-button";
import React from "react";

export function HomeCtaSection() {
    return (
        <section className="px-4 py-12 w-full overflow-hidden flex flex-col items-center">
            <div className="relative max-w-7xl w-full flex items-center justify-center">
                <div className=" mx-auto max-w-5xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                    <div className="relative">
                        <Icons.LogoCodesnippify className="size-24 md:size-28 z-50" />
                        <div className="absolute inset-3 bg-brand blur-3xl"></div>
                    </div>
                    <div className="p-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                        <span className="inline-block">Ready to simplify</span>
                        <span className="inline-block">your coding life?</span>
                    </div>
                    <p className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center px-6">
                        Start building your personalized snippet library today.
                    </p>
                    <CtaButton
                        label="Get Started Free"
                        href="/signup"
                        className="mt-8 w-fit px-10 !font-monaSans"
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-glow [mask-image:linear-gradient(to_bottom,transparent,background_8rem)]" />
            </div>
        </section>
    );
}
