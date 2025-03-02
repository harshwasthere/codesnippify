import { Icons } from "@/assets/icons";
import { ActionButton } from "@/components/ui/action-button";
import React from "react";
import * as motion from "motion/react-client";

export function HomeCallToActionSection() {
    return (
        <section className="w-full px-4 sm:px-8 py-12 flex flex-col items-center overflow-hidden">
            <div className="relative max-w-7xl w-full flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className=" mx-auto max-w-5xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10"
                >
                    {/* logo */}
                    <motion.div
                        className="relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Icons.LogoCodesnippify className="size-24 md:size-28 z-50" />
                        <motion.div
                            className="absolute inset-3 bg-glow blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    </motion.div>
                    {/* title */}
                    <motion.div
                        className="py-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none tracking-tighter m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent drop-shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <span className="inline-block">Ready to simplify</span>
                        <span className="inline-block">your coding life?</span>
                    </motion.div>
                    {/* description */}
                    <motion.p
                        className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        Start building your personalized snippet library today.
                    </motion.p>
                    {/* action button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ActionButton
                            label="Get Started Free"
                            href="/signup"
                            className="mt-8 w-fit px-10"
                        />
                    </motion.div>
                </motion.div>
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl shadow-glow [mask-image:linear-gradient(to_bottom,transparent,background_8rem)]"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                />
            </div>
        </section>
    );
}
