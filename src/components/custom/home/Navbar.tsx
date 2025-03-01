import Link from "next/link";

export function HomeNavbar() {
    const pathOptions = [
        {
            label: "Features",
            href: "#features",
        },
        {
            label: "Pricing",
            href: "#pricing",
        },
        {
            label: "Login",
            href: "/login",
        },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-background/80 px-4 text-sm backdrop-blur backdrop-saturate-200">
            <div className="mx-auto flex max-w-2xl w-full items-center justify-between border-b border-border">
                <h1 className="flex-1 shrink-0 text-lg font-bold">
                    <Link href="/" className="py-4">
                        Codesnippify
                    </Link>
                </h1>
                <ul className="-mx-4 flex items-center justify-end font-medium text-foreground ">
                    {pathOptions.map((option) => (
                        <li key={option.href} className="max-xs:first:hidden">
                            <Link
                                href={option.href}
                                className="block p-4 opacity-70 transition-opacity hover:opacity-100"
                            >
                                {option.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
