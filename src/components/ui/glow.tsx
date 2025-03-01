import React from "react";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { motion, Variants } from "framer-motion";

const glowVariants = cva("absolute w-full", {
    variants: {
        position: {
            top: "top-0",
            above: "-top-[128px]",
            bottom: "bottom-0",
            below: "-bottom-[128px]",
            center: "top-[50%]",
        },
        intensity: {
            normal: "",
            light: "opacity-80",
        },
    },
    defaultVariants: {
        position: "top",
        intensity: "normal",
    },
});

interface GlowProps
    extends Omit<React.ComponentProps<typeof motion.div>, keyof VariantProps<typeof glowVariants>>,
        VariantProps<typeof glowVariants> {
    customAnimation?: Variants;
}

const Glow = React.forwardRef<HTMLDivElement, GlowProps>(
    ({ className, position, intensity, customAnimation, ...props }, ref) => (
        <motion.div
            ref={ref}
            className={cn(glowVariants({ position, intensity }), className)}
            initial="initial"
            animate="animate"
            variants={customAnimation}
            {...props}
        >
            <motion.div
                className={cn(
                    "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--glow-foreground)/.5)_10%,_hsla(var(--glow-foreground)/0)_60%)] sm:h-[512px]",
                    position === "center" && "-translate-y-1/2",
                )}
            />
            <motion.div
                className={cn(
                    "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--glow)/.3)_10%,_hsla(var(--glow-foreground)/0)_60%)] sm:h-[256px]",
                    position === "center" && "-translate-y-1/2",
                )}
            />
        </motion.div>
    ),
);

Glow.displayName = "Glow";

export { Glow };
