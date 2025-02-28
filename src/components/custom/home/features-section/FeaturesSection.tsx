"use client";

import React from "react";
import { SectionHeader } from "@/components/custom/home/SectionHeader";
import { FeatureDetailCard } from "./FeatureDetailCard";
import { FeatureMockup } from "./features/FeatureMockup";
import { LanguagesIcon, LockIcon, PickaxeIcon } from "lucide-react";

const FEATURES = [
    {
        step: 1,
        icon: <PickaxeIcon className="size-6 text-primary" />,
        title: "Create, Save & Organize Snippets",
        description:
            "Effortlessly save your favorite code snippets and keep them neatly organized with folders, tags, and language-based categorization. Stay productive with everything you need at your fingertips.",
    },
    {
        step: 2,
        icon: <LockIcon className="size-6 text-primary" />,
        title: "Secure & Private, with Public Folder Sharing",
        description:
            "Keep your private snippets safe and secure while easily sharing your collections with public folder links. Collaborate and share knowledge seamlessly with just a click.",
    },
    {
        step: 3,
        icon: <LanguagesIcon className="size-6 text-primary" />,
        title: "Multi-Language Support & Syntax Highlighting",
        description:
            "Manage code snippets in any programming language with built-in syntax highlighting. Use advanced filtering options to quickly find the exact snippet you need, when you need it.",
    },
];

export function HomeFeaturesSection() {
    const [currentActiveStep, setCurrentActiveStep] = React.useState(1);

    return (
        <section id="features" className="w-full px-4 sm:px-8 flex flex-col items-center">
            <SectionHeader
                title="Features"
                description="Effortlessly organize your code with folders, tags, and languages, share public
                    folder links, and find snippets instantly with advanced search tools."
            />
            <div className="mx-auto max-w-7xl w-full">
                {/* Mobile layout */}
                <div className="flex flex-col gap-28 md:hidden">
                    {FEATURES.map((feature, index) => (
                        <div key={index} className="flex flex-col gap-12">
                            <FeatureDetailCard
                                title={feature.title}
                                description={feature.description}
                                step={feature.step}
                                setCurrentActiveStep={setCurrentActiveStep}
                                icon={feature.icon}
                                className="h-full items-center justify-center text-center"
                            />
                            <div className="w-full flex justify-center">
                                <div className="scale-[0.5] xs:scale-[0.6] 2xs:scale-[0.7] sm:scale-[0.8] origin-center">
                                    <FeatureMockup step={feature.step as 1 | 2 | 3} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop layout - remains unchanged */}
                <div className="hidden md:flex w-full items-start justify-center gap-8">
                    <div className="w-full flex-1 max-w-xl">
                        {FEATURES.map((feature, index) => (
                            <FeatureDetailCard
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                step={feature.step}
                                icon={feature.icon}
                                setCurrentActiveStep={setCurrentActiveStep}
                            />
                        ))}
                    </div>
                    <div className="sticky top-0 flex h-[100vh] items-center">
                        <div className="sm:max-w-[450px] lg:max-w-[600px] flex items-center justify-center overflow-hidden">
                            <div className="sm:scale-[0.8] lg:scale-[1] origin-center">
                                <FeatureMockup step={currentActiveStep as 1 | 2 | 3} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
