"use client";

import { useInView } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";
interface FeatureDetailCardProps {
    title: string;
    description: string;
    step: number;
    setCurrentActiveStep: (step: number) => void;
    className?: string;
    icon: React.ReactNode;
}

export function FeatureDetailCard({
    title,
    description,
    step,
    setCurrentActiveStep,
    className,
    icon,
}: FeatureDetailCardProps) {
    const ref = React.useRef<HTMLDivElement>(null);

    const isInView = useInView(ref, {
        margin: "-50% 0px -50% 0px",
    });

    React.useEffect(() => {
        if (isInView) {
            setCurrentActiveStep(step);
        }
    }, [isInView, step, setCurrentActiveStep]);

    return (
        <div
            ref={ref}
            className={cn(
                "w-full h-[100vh] flex flex-col items-start justify-center gap-4",
                className,
            )}
        >
            <div className="flex items-start gap-2 max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-3 max-xs:max-w-xs max-w-xl">
                {icon}
                <h3 className="sm:text-lg md:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
                    {title}
                </h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base font-medium text-balance text-muted-foreground max-xs:max-w-xs max-w-xl">
                {description}
            </p>
        </div>
    );
}
