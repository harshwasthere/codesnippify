import { Icons } from "@/assets/icons";
import { ActionButton } from "@/components/ui/action-button";
import React from "react";

export function HomeCallToActionSection() {
    return (
        <section className="w-full px-4 sm:px-8 py-12 flex flex-col items-center overflow-hidden">
            <div className="relative max-w-7xl w-full flex items-center justify-center">
                <div className=" mx-auto max-w-5xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                    {/* logo */}
                    <div className="relative">
                        <Icons.LogoCodesnippify className="size-24 md:size-28 z-50" />
                        <div className="absolute inset-3 bg-glow blur-3xl"></div>
                    </div>
                    {/* title */}
                    <div className="py-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tighter  m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-2xl">
                        <span className="inline-block">Ready to simplify</span>
                        <span className="inline-block">your coding life?</span>
                    </div>
                    {/* description */}
                    <p className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center">
                        Start building your personalized snippet library today.
                    </p>
                    {/* action button */}
                    <ActionButton
                        label="Get Started Free"
                        href="/signup"
                        className="mt-8 w-fit px-10"
                    />
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-glow [mask-image:linear-gradient(to_bottom,transparent,background_8rem)]" />
            </div>
        </section>
    );
}
