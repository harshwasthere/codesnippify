"use client";

import { motion } from "framer-motion";

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2,
        },
    },
    end: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const loadingCircleVariants = {
    start: {
        y: "0%",
    },
    end: {
        y: "-100%",
    },
};

export default function BounceLoader() {
    return (
        <motion.div
            className="p-4 w-fit flex items-center justify-start space-x-1"
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.span
                variants={loadingCircleVariants}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="size-3 rounded-full bg-foreground"
            />
            <motion.span
                variants={loadingCircleVariants}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="size-3 rounded-full bg-foreground"
            />
            <motion.span
                variants={loadingCircleVariants}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
                className="size-3 rounded-full bg-foreground"
            />
        </motion.div>
    );
}
