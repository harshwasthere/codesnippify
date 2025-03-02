import { ActionButton } from "@/components/ui/action-button";
import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import * as motion from "motion/react-client";

interface PricingCardProps {
    type?: "primary" | "secondary";
    title: string;
    description: string;
    price: string;
    features: {
        feature: string;
        badgeText?: string;
    }[];
    actionButton: {
        text: string;
        href: string;
    };
    className?: string;
}

export function PricingCard({
    type = "secondary",
    title,
    description,
    price,
    features,
    actionButton,
    className,
}: PricingCardProps) {
    const isPrimary = type === "primary";

    // Add motion animations
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    // Primary card background fill animation
    const fillVariants = (isPrimary: boolean) => {
        const primaryColor = isPrimary ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))";
        return {
            initial: {
                background: `linear-gradient(135deg, ${primaryColor} 0%, transparent 0%)`,
                opacity: 0.2,
            },
            animate: {
                background: `linear-gradient(135deg, ${primaryColor} 100%, transparent 0%)`,
                opacity: 0.2,
                transition: { duration: 0.5, ease: "easeInOut" },
            },
        };
    };

    return (
        <Card
            className={cn(
                "w-full max-w-sm flex flex-col justify-center rounded-2xl border-2 overflow-hidden relative",
                isPrimary ? "border-primary/40" : "border-muted bg-transparent",
                className,
            )}
        >
            <motion.div
                className="absolute inset-0 z-0"
                variants={fillVariants(isPrimary)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            />
            <CardHeader className="relative z-10">
                <CardTitle className={cn("text-3xl font-semibold", isPrimary && "text-primary")}>
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 h-full relative z-10">
                <div className={cn(isPrimary && "text-primary")}>
                    <span className="text-sm font-light leading-none text-muted-foreground">
                        From
                    </span>
                    <div className="flex items-end gap-1">
                        <span className="text-4xl font-medium leading-none">{price}</span>
                        <span className="text-sm font-light text-muted-foreground">/ Lifetime</span>
                    </div>
                </div>

                <motion.ul
                    className="space-y-3"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                >
                    {features.map(({ feature, badgeText }) => (
                        <motion.li
                            key={feature}
                            className="flex gap-x-2 items-center"
                            variants={item}
                        >
                            <CheckIcon className={cn("size-4", isPrimary && "text-primary")} />
                            <span className="leading-none">{feature}</span>
                            {badgeText && (
                                <Badge className="text-xs font-light leading-tighter rounded-full bg-gradient-to-r from-foreground to-muted-foreground text-background">
                                    {badgeText}
                                </Badge>
                            )}
                        </motion.li>
                    ))}
                </motion.ul>
            </CardContent>
            <CardFooter className="relative z-10">
                {isPrimary ? (
                    <ActionButton
                        label={actionButton.text}
                        href={actionButton.href}
                        className="w-full rounded-2xl"
                    />
                ) : (
                    <Link
                        href={actionButton.href}
                        className={cn(
                            buttonVariants({ variant: "secondary" }),
                            "w-full h-12 rounded-2xl bg-gradient-to-r from-foreground/10 to-foreground/20",
                        )}
                    >
                        {actionButton.text}
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}
