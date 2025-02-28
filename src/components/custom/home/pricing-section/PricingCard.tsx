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

    return (
        <Card
            className={cn(
                "w-full max-w-sm flex flex-col justify-center rounded-2xl border-2 bg-muted",
                isPrimary && "border-primary bg-primary/20",
                className,
            )}
        >
            <CardHeader>
                <CardTitle className={cn("text-3xl font-semibold", isPrimary && "text-primary")}>
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 h-full">
                <div className={cn(isPrimary && "text-primary")}>
                    <span className="text-sm font-light leading-none text-muted-foreground">
                        From
                    </span>
                    <div className="flex items-end gap-1">
                        <span className="text-4xl font-medium leading-none">{price}</span>
                        <span className="text-sm font-light text-muted-foreground">/ Lifetime</span>
                    </div>
                </div>

                <ul className="space-y-3">
                    {features.map(({ feature, badgeText }) => (
                        <li key={feature} className="flex gap-x-2 items-center">
                            <CheckIcon className={cn("size-4", isPrimary && "text-primary")} />
                            <span className="leading-none">{feature}</span>
                            {badgeText && (
                                <Badge className="text-xs font-light leading-tighter rounded-full bg-gradient-to-r from-foreground to-muted-foreground text-background">
                                    {badgeText}
                                </Badge>
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
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
