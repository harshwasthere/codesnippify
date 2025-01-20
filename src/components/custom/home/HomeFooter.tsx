import { Twitter } from "lucide-react";
import Link from "next/link";

export function HomeFooter() {
    return (
        <footer className="bg-background/80 px-4 text-sm backdrop-blur backdrop-saturate-200 !p-10">
            <div className="mx-auto flex flex-col justify-between max-w-5xl w-full">
                <nav className="w-full flex  flex-col md:flex-row items-center justify-between gap-4 py-4 ">
                    <div className="flex items-center justify-center gap-4 ">
                        <Link href="/" className="block transition-colors hover:text-primary">
                            Home
                        </Link>
                        <Link
                            href="/features"
                            className="block transition-colors hover:text-primary"
                        >
                            Features
                        </Link>
                        <Link
                            href="/pricing"
                            className="block transition-colors hover:text-primary"
                        >
                            Pricing
                        </Link>
                        <Link href="/faq" className="block transition-colors hover:text-primary">
                            FAQ
                        </Link>
                    </div>
                    <Link
                        href="https://x.com/harshwasthere"
                        target="_blank"
                        className="flex items-center gap-2  transition-colors hover:text-primary group"
                    >
                        <Twitter className="size-4 fill-foreground group-hover:fill-primary" />
                        @harshwasthere
                    </Link>
                </nav>
                <div className="flex flex-col items-center justify-between gap-4 py-4 text-center md:flex-row">
                    <p className="text-muted-foreground">
                        © 2024 Codesnippify. All rights reserved.
                    </p>
                    <nav className="flex gap-4">
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary hover:underline"
                        >
                            Terms of Service
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
