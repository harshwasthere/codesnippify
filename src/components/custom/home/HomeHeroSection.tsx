"use client";

import { Icons } from "@/assets/icons";
import { CtaButton } from "@/components/ui/cta-button";
import { Glow } from "@/components/ui/glow";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

interface HeroCtaButton {
    text: string;
    href: string;
}

interface HomeHeroSectionProps {
    title1: string;
    title2: string;
    description: string;
    ctaButton: HeroCtaButton;
    image: {
        light: string;
        dark: string;
        alt: string;
    };
}

export function HomeHeroSection({
    title1,
    title2,
    description,
    ctaButton,
    image,
}: HomeHeroSectionProps) {
    const { resolvedTheme } = useTheme();
    const imageSrc = resolvedTheme === "light" ? image.light : image.dark;

    return (
        <section className="w-full overflow-hidden px-4 flex flex-col items-center">
            <header className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                <div className="relative">
                    <Icons.LogoCodesnippify className="size-24 md:size-28 z-50" />
                    <div className="absolute inset-3 bg-brand blur-3xl"></div>
                </div>
                <div className="py-2 pb-4 text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    <span className="inline-block">{title1}</span>
                    <span className="inline-block">{title2}</span>
                </div>
                <p className="text-xl xs:text-2xl md:text-3xl font-medium leading-snug text-muted-foreground text-center">
                    {description}
                </p>

                <CtaButton
                    label={ctaButton.text}
                    href={ctaButton.href}
                    className="mt-8 w-fit px-10 !font-monaSans"
                />
            </header>
            <div className="relative mx-auto max-w-7xl">
                <MockupFrame size="small">
                    <Mockup type="responsive">
                        <Image src={imageSrc} alt={image.alt} width={1248} height={765} priority />
                    </Mockup>
                </MockupFrame>
                <Glow variant="top" />
            </div>
        </section>
    );
}
