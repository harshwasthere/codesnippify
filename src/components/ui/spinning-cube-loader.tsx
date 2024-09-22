import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function SpinningCubeLoader({ className }: { className?: string }) {
    const cubeVariants = {
        spin: {
            rotateX: 360,
            rotateY: 360,
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
            },
        },
    };

    return (
        <div className="flex items-center justify-center">
            <motion.div
                className={cn("h-16 w-16 rounded-sm bg-muted-foreground/50", className)}
                variants={cubeVariants}
                animate="spin"
                style={{ perspective: 200 }}
            ></motion.div>
        </div>
    );
}
