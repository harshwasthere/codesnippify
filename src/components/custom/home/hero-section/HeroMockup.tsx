"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Mockup } from "./MockupFrame";
import { MockupFrame } from "./MockupFrame";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Glow } from "@/components/ui/glow";

interface HeroMockupProps extends React.HTMLAttributes<HTMLDivElement> {
    lightImgPath: string;
    darkImgPath: string;
    alt: string;
    glowVariant?: "top" | "bottom" | "center";
}

export function HeroMockup({
    className,
    lightImgPath,
    darkImgPath,
    alt,
    glowVariant = "top",
    ...props
}: HeroMockupProps) {
    const { resolvedTheme } = useTheme();
    const imageSrc = resolvedTheme === "light" ? lightImgPath : darkImgPath;
    return (
        <div className={cn("relative mx-auto max-w-7xl", className)} {...props}>
            <MockupFrame size="small">
                <Mockup type="responsive">
                    <Image src={imageSrc} alt={alt} width={1248} height={765} priority />
                </Mockup>
            </MockupFrame>
            <Glow variant={glowVariant} />
        </div>
    );
}
