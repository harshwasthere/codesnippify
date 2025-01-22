import Link from "next/link";
import React from "react";

export function HomeNavbar() {
    return (
        <nav className="sticky top-0 z-50 bg-background/80 px-4 text-sm backdrop-blur backdrop-saturate-200">
            <div className="mx-auto flex max-w-2xl w-full items-center justify-between border-b border-border">
                <h1 className="flex-1 shrink-0 text-lg font-bold">
                    <Link className="py-4" data-discover="true" href="/">
                        Codesnippify
                    </Link>
                </h1>
                <ul className="-mx-4 flex items-center justify-end font-medium text-foreground">
                    <li>
                        <Link
                            data-discover="true"
                            className="block p-4 max-xs:px-2 opacity-70 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
                            href="/updates"
                        >
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link
                            data-discover="true"
                            className="block p-4 max-xs:px-2 opacity-70 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
                            href="/pricing"
                        >
                            Pricing
                        </Link>
                    </li>
                    <li>
                        <Link
                            data-discover="true"
                            className="block p-4 max-xs:px-2 opacity-70 transition-opacity hover:opacity-100 aria-[current=page]:opacity-100"
                            href="/login"
                        >
                            Log in
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
