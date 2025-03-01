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
    glowPosition?: "top" | "bottom" | "center";
}

const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export function HeroMockup({
    className,
    lightImgPath,
    darkImgPath,
    alt,
    glowPosition = "top",
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
            <Glow
                position={glowPosition}
                customAnimation={{
                    initial: {
                        ...fadeInScale.hidden,
                    },
                    animate: {
                        ...fadeInScale.visible,
                        transition: {
                            duration: 0.5,
                            delay: 0.7,
                            ease: "easeOut",
                        },
                    },
                }}
            />
        </div>
    );
}
