import React from "react";
import { Icons } from "@/assets/icons";
import { ActionButton } from "@/components/ui/action-button";
import * as motion from "motion/react-client";
import { HeroMockup } from "./HeroMockup";

const heroSectionAnimations = {
    fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 0.8,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    },
    fadeInScale: {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
};

export function HomeHeroSection() {
    return (
        <section className="w-full overflow-hidden px-4 flex flex-col items-center">
            <motion.header
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={heroSectionAnimations.staggerContainer}
                className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10"
            >
                {/* logo with glow */}
                <motion.div variants={heroSectionAnimations.fadeInUp} className="relative">
                    <Icons.LogoCodesnippify className="size-24 md:size-28 z-50" />
                    <motion.div
                        variants={{
                            ...heroSectionAnimations.fadeInUp,
                            visible: {
                                ...heroSectionAnimations.fadeInUp.visible,
                                transition: { delay: 0.4 },
                            },
                        }}
                        className="absolute inset-4 bg-glow blur-3xl"
                    ></motion.div>
                </motion.div>
                {/* title */}
                <motion.div
                    variants={heroSectionAnimations.fadeInUp}
                    className="py-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tighter m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-2xl"
                >
                    <span className="inline-block">All Your Snippets,</span>
                    <span className="inline-block">Neatly Organized</span>
                </motion.div>
                {/* description */}
                <motion.p
                    variants={heroSectionAnimations.fadeInUp}
                    className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center"
                >
                    Save, organize, and share your code snippets effortlessly. Focus on coding, not
                    searching.
                </motion.p>
                {/* action button */}
                <motion.div
                    variants={{
                        ...heroSectionAnimations.fadeInUp,
                        visible: {
                            ...heroSectionAnimations.fadeInUp.visible,
                            transition: { delay: 0.4, duration: 0.5 },
                        },
                    }}
                >
                    <ActionButton label="Get Started" href="/login" className="mt-8 w-fit px-10" />
                </motion.div>
            </motion.header>
            {/* app mockup */}
            <motion.div
                variants={heroSectionAnimations.fadeInScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    delay: 0.3,
                }}
            >
                <HeroMockup
                    lightImgPath="/app-light.png"
                    darkImgPath="/app-dark.png"
                    alt="app-demo"
                />
            </motion.div>
        </section>
    );
}
