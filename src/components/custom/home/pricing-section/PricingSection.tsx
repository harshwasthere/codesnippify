import React from "react";
import { PricingCard } from "./PricingCard";
import { SectionHeader } from "../SectionHeader";

export function HomePricingSection() {
    return (
        <section id="pricing" className="w-full px-4 sm:px-8 flex flex-col items-center">
            <SectionHeader
                title="Pricing"
                description="Choose the plan that's right for you. No hidden fees, no surprises."
            />
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 h-full">
                <PricingCard
                    title="Free"
                    description="The Free plan is for individuals who want to try the app."
                    price="0$"
                    features={[
                        { feature: "2000 Characters" },
                        { feature: "100 Snippets" },
                        { feature: "5 Folders" },
                    ]}
                    actionButton={{ text: "Start for free", href: "/signup" }}
                />
                <PricingCard
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
                    actionButton={{ text: "Get Pro", href: "/pricing" }}
                />
            </div>
        </section>
    );
}
