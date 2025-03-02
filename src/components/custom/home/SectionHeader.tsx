import React from "react";
import * as motion from "motion/react-client";

const heroSectionAnimations = {
    fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 0.8,
            y: 0,
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

export function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <motion.div
            variants={heroSectionAnimations.staggerContainer}
            initial="hidden"
            whileInView="visible"
            className="mx-auto max-w-lg md:max-w-xl sm:max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10"
        >
            <motion.div
                variants={heroSectionAnimations.fadeInUp}
                className=" p-2 pb-4 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-center"
            >
                {title}
            </motion.div>
            <motion.p
                variants={heroSectionAnimations.fadeInUp}
                className="text-base xs:text-lg md:text-xl font-medium leading-snug text-muted-foreground text-center max-xs:max-w-xs "
            >
                {description}
            </motion.p>
        </motion.div>
    );
}
