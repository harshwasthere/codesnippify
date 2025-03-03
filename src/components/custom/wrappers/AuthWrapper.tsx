import Link from "next/link";

interface AuthWrapperProps {
    iconComp: React.ReactNode;
    title: string;
    description?: string;
    children: React.ReactNode;
    primaryLink?: {
        text: string;
        href: string;
    };
    secondaryLink?: {
        text: string;
        href: string;
    };
}

export function AuthWrapper({
    iconComp,
    title,
    description,
    children,
    primaryLink,
    secondaryLink,
}: AuthWrapperProps) {
    return (
        <main className="w-full h-screen flex items-center justify-center p-4">
            <div className="max-w-96 w-full flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                    {iconComp}
                    <h1 className="text-4xl font-extrabold">{title}</h1>
                    {description && (
                        <p className="max-w-80 text-center text-muted-foreground">{description}</p>
                    )}
                </div>
                {children}
                <div className="flex flex-col items-center gap-2">
                    {primaryLink && (
                        <Link
                            href={primaryLink.href}
                            className="text-muted-foreground/80 hover:underline hover:text-muted-foreground text-sm"
                        >
                            {primaryLink.text}
                        </Link>
                    )}
                    {secondaryLink && (
                        <Link
                            href={secondaryLink.href}
                            className="text-foreground/70 hover:underline hover:text-foreground text-sm"
                        >
                            {secondaryLink.text}
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
}
