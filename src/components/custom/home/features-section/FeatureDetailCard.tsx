"use client";

import { useInView } from "motion/react";
import * as motion from "motion/react-client";
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

const cardAnimations = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            duration: 0.6,
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: {
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

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
            <motion.div
                variants={cardAnimations}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: false, margin: "-10%" }}
                className="flex items-start gap-2 max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-3 max-xs:max-w-xs max-w-xl"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                        delay: 0.1,
                    }}
                >
                    {icon}
                </motion.div>
                <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        delay: 0.2,
                    }}
                    className="sm:text-lg md:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text"
                >
                    {title}
                </motion.h3>
            </motion.div>
            <motion.p
                variants={cardAnimations}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
                viewport={{ once: false, margin: "-10%" }}
                className="text-xs sm:text-sm md:text-base font-medium text-balance text-muted-foreground max-xs:max-w-xs max-w-xl"
            >
                {description}
            </motion.p>
        </div>
    );
}
