import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CtaButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    label?: string;
    className?: string;
    href: string;
}

function CtaButton({ label = "Get Access", className, href, ...props }: CtaButtonProps) {
    return (
        <Link
            href={href}
            className={cn(
                buttonVariants({ variant: "ghost" }),
                "group relative w-1/2 h-12 px-4 rounded-lg overflow-hidden transition-all duration-500",
                className,
            )}
            {...props}
        >
            <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-b dark:from-[#807DFF] dark:via-[#090B2A] dark:to-[#2B2EED] from-[#4B45FF] via-[#6166FF] to-[#4B45FF]">
                <div className="absolute inset-0 dark:bg-[#090B2A] bg-white/75 rounded-lg opacity-85" />
            </div>

            <div className="absolute inset-[2px] dark:bg-[#090B2A] bg-white/80 rounded-lg opacity-90" />

            <div className="absolute inset-[2px] bg-gradient-to-r dark:from-[#090B2A] dark:via-[#0D0E33] dark:to-[#090B2A] from-white/65 via-[#ECF0FF] to-white/65 rounded-lg opacity-85" />
            <div className="absolute inset-[2px] bg-gradient-to-b dark:from-[#807DFF]/55 dark:via-[#0D0E33] dark:to-[#4B45FF]/45 from-[#4B45FF]/25 via-[#7B86FF]/45 to-[#4B45FF]/35 rounded-lg opacity-90" />
            <div className="absolute inset-[2px] bg-gradient-to-br dark:from-[#8BB0FF]/25 dark:via-[#0D0E33] dark:to-[#171E36]/60 from-[#4B45FF]/20 via-[#7B86FF]/25 to-[#4B45FF]/35 rounded-lg" />

            <div className="absolute inset-[2px] dark:shadow-[inset_0_0_15px_rgba(75,69,255,0.3)] shadow-[inset_0_0_15px_rgba(75,69,255,0.45)] rounded-lg" />

            <div className="relative flex items-center justify-center gap-2">
                <span className="text-lg font-normal bg-gradient-to-b dark:from-[#A5AAFF] dark:to-[#4B45FF] from-[#4B45FF] to-[#2B2EED] bg-clip-text text-transparent dark:drop-shadow-[0_0_12px_rgba(75,69,255,0.6)] drop-shadow-[0_0_12px_rgba(75,69,255,0.35)] tracking-tighter">
                    {label}
                </span>
            </div>

            <div className="absolute inset-[2px] opacity-0 transition-opacity duration-300 bg-gradient-to-r dark:from-[#171E36]/35 dark:via-[#4B45FF]/25 dark:to-[#171E36]/35 from-[#4B45FF]/20 via-[#7B86FF]/25 to-[#4B45FF]/20 group-hover:opacity-100 rounded-lg" />
        </Link>
    );
}

export { CtaButton };
