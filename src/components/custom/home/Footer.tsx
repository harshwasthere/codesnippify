import { cn } from "@/lib/utils";
import { Twitter } from "lucide-react";
import Link from "next/link";
import * as motion from "motion/react-client";

// Animation variants
const footerAnimations = {
    fadeIn: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.4 },
    },
    slideUp: {
        initial: { y: 20, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5 },
    },
    staggerChildren: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { staggerChildren: 0.1 },
    },
};

const footerItemAnimation = {
    initial: { y: 10, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.3 },
};

export function HomeFooter({ className }: { className?: string }) {
    // Group navigation items for better organization
    const mainNavItems = [
        { label: "Home", href: "/" },
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
    ];

    const legalNavItems = [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
    ];

    return (
        <motion.footer
            {...footerAnimations.slideUp}
            className={cn(
                "w-full bg-background/80 backdrop-blur backdrop-saturate-200",
                "px-4 sm:px-8 py-12",
                className,
            )}
        >
            <div className="mx-auto max-w-5xl w-full flex flex-col gap-8">
                {/* Main Navigation */}
                <motion.nav
                    {...footerAnimations.staggerChildren}
                    className="w-full flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <motion.div
                        {...footerAnimations.staggerChildren}
                        className="flex items-center gap-6"
                    >
                        {mainNavItems.map((item) => (
                            <motion.div key={item.href} {...footerItemAnimation}>
                                <Link
                                    href={item.href}
                                    className="text-sm transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                    <motion.div {...footerAnimations.fadeIn}>
                        <Link
                            href="https://x.com/harshwasthere"
                            target="_blank"
                            className="flex items-center gap-2 text-sm transition-colors hover:text-primary group"
                        >
                            <Twitter className="size-4 fill-foreground group-hover:fill-primary" />
                            @harshwasthere
                        </Link>
                    </motion.div>
                </motion.nav>

                {/* Bottom Section */}
                <motion.div
                    {...footerAnimations.fadeIn}
                    className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border"
                >
                    <p className="text-sm text-muted-foreground">
                        © 2024 Codesnippify. All rights reserved.
                    </p>
                    <motion.nav {...footerAnimations.staggerChildren} className="flex gap-6">
                        {legalNavItems.map((item) => (
                            <motion.div key={item.href} {...footerItemAnimation}>
                                <Link
                                    href={item.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
                                >
                                    {item.label}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.nav>
                </motion.div>
            </div>
        </motion.footer>
    );
}
