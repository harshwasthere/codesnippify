import { cn } from "@/lib/utils";
import { Twitter } from "lucide-react";
import Link from "next/link";

export function HomeFooter({ className }: { className?: string }) {
    // Group navigation items for better organization
    const mainNavItems = [
        { label: "Home", href: "/" },
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
    ];

    const legalNavItems = [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms-of-service" },
    ];

    return (
        <footer
            className={cn(
                "w-full bg-background/80 backdrop-blur backdrop-saturate-200",
                "px-4 sm:px-8 py-12",
                className,
            )}
        >
            <div className="mx-auto max-w-5xl w-full flex flex-col gap-8">
                {/* Main Navigation */}
                <nav className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {mainNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm transition-colors hover:text-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href="https://x.com/harshwasthere"
                        target="_blank"
                        className="flex items-center gap-2 text-sm transition-colors hover:text-primary group"
                    >
                        <Twitter className="size-4 fill-foreground group-hover:fill-primary" />
                        @harshwasthere
                    </Link>
                </nav>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                        © 2024 Codesnippify. All rights reserved.
                    </p>
                    <nav className="flex gap-6">
                        {legalNavItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
