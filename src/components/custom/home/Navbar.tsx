import Link from "next/link";
import * as motion from "motion/react-client";

// Navigation item type definition
interface NavItem {
    label: string;
    href: string;
}

// Animation variants
const navbarAnimations = {
    fadeIn: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.4 },
    },
    slideIn: {
        initial: { width: "0px", opacity: 0 },
        whileInView: { width: "100%", opacity: 1 },
        viewport: { once: true },
        transition: {
            opacity: { delay: 0.3 },
            duration: 0.7,
        },
    },
    staggerChildren: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { staggerChildren: 0.1 },
    },
};

const navItemAnimation = {
    initial: { y: -20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.3 },
};

export function HomeNavbar() {
    const pathOptions: NavItem[] = [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Login", href: "/login" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-background/80 px-4 text-sm backdrop-blur backdrop-saturate-200">
            <motion.div
                {...navbarAnimations.slideIn}
                className="mx-auto flex max-w-2xl w-full items-center justify-between border-b border-border"
            >
                <motion.h1
                    {...navbarAnimations.fadeIn}
                    className="flex-1 shrink-0 text-lg font-bold"
                >
                    <Link href="/" className="py-4">
                        Codesnippify
                    </Link>
                </motion.h1>
                <motion.ul
                    {...navbarAnimations.staggerChildren}
                    className="-mx-4 flex items-center justify-end font-medium text-foreground"
                >
                    {pathOptions.map((option) => (
                        <motion.li
                            key={option.href}
                            {...navItemAnimation}
                            className="max-xs:first:hidden"
                        >
                            <Link
                                href={option.href}
                                className="block p-4 opacity-70 transition-opacity hover:opacity-100"
                            >
                                {option.label}
                            </Link>
                        </motion.li>
                    ))}
                </motion.ul>
            </motion.div>
        </nav>
    );
}
