import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CtaButton } from "@/components/ui/cta-button";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";

export function HomePricingSection() {
    return (
        <section
            id="pricing"
            className="px-4 py-12 !pt-0 max-w-3xl mx-auto flex flex-col items-center"
        >
            <div className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                <div className="p-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Pricing
                </div>
                <p className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center">
                    Choose the plan that suits your needs.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 h-full">
                <PricingCard
                    className="flex-1 flex flex-col justify-between"
                    type="secondary"
                    title="Free"
                    description="The Free plan is for individuals who want to try the app."
                    price="0$"
                    features={[
                        { feature: "2000 Characters" },
                        { feature: "100 Snippets" },
                        { feature: "5 Folders" },
                    ]}
                    ctaButton={{ text: "Start for free", href: "/signup" }}
                />
                <PricingCard
                    className="flex-1"
                    type="primary"
                    title="Pro"
                    description="The Pro plan is for individuals who need more features and support."
                    price="5$"
                    features={[
                        { feature: "5000 Characters" },
                        { feature: "Unlimited Snippets" },
                        { feature: "500 Folders" },
                        { feature: "Public sharable folders" },
                        { feature: "AI Assistant", badgeText: "Coming Soon" },
                    ]}
                    ctaButton={{ text: "Get Pro", href: "/pricing" }}
                />
            </div>
        </section>
    );
}

interface PricingCardProps {
    type: "primary" | "secondary";
    title: string;
    description: string;
    price: string;
    features: {
        feature: string;
        badgeText?: string;
    }[];
    ctaButton: {
        text: string;
        href: string;
    };
    className?: string;
}

function PricingCard({
    type,
    title,
    description,
    price,
    features,
    ctaButton,
    className,
}: PricingCardProps) {
    return (
        <Card
            className={cn(
                "w-full max-w-md rounded-3xl flex flex-col justify-center",
                type === "primary" && "border-2 border-brand",
                className,
            )}
        >
            <CardHeader>
                <CardTitle
                    className={cn("text-3xl font-semibold", type === "primary" && "text-brand")}
                >
                    {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 h-full">
                <div className={cn(type === "primary" && "text-brand")}>
                    <span className="text-sm font-light leading-none text-muted-foreground">
                        From
                    </span>
                    <div className="flex items-end gap-1">
                        <span className="text-4xl font-medium leading-none">{price}</span>
                        <span className="text-sm font-light text-muted-foreground">/ Lifetime</span>
                    </div>
                </div>

                <div>
                    <ul className="space-y-3 pb-0.5">
                        {features.map(({ feature, badgeText }) => (
                            <li key={feature} className="flex gap-x-2 items-center">
                                <CheckIcon
                                    className={cn("size-4", type === "primary" && "text-brand")}
                                />
                                <span className="leading-none">{feature}</span>
                                {badgeText && (
                                    <Badge className="text-xs font-light leading-tighter rounded-full bg-gradient-to-r from-foreground to-muted-foreground text-background">
                                        {badgeText}
                                    </Badge>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                {type === "primary" ? (
                    <CtaButton
                        label={ctaButton.text}
                        href={ctaButton.href}
                        className="w-full rounded-full !font-monaSans"
                    />
                ) : (
                    <Link
                        href={ctaButton.href}
                        className={cn(
                            buttonVariants({ variant: "secondary" }),
                            "w-full rounded-full !font-monaSans h-12",
                        )}
                    >
                        {ctaButton.text}
                    </Link>
                )}
            </CardFooter>
        </Card>
    );
}
