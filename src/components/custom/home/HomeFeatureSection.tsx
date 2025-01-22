"use client";

import { useState } from "react";
import { HomeFeatureCard } from "../cards/HomeFeatureCard";
import HomeFeature1 from "../home-features/HomeFeature1";
import HomeFeature2 from "../home-features/HomeFeature2";
import HomeFeature3 from "../home-features/HomeFeature3";

const features = [
    {
        showComponent: <HomeFeature1 />,
        title: "Create, Save & Organize Snippets",
        description:
            "Effortlessly save your favorite code snippets and keep them neatly organized with folders, tags, and language-based categorization. Stay productive with everything you need at your fingertips.",
    },
    {
        showComponent: <HomeFeature2 />,
        title: "Secure & Private, with Public Folder Sharing",
        description:
            "Keep your private snippets safe and secure while easily sharing your collections with public folder links. Collaborate and share knowledge seamlessly with just a click.",
    },
    {
        showComponent: <HomeFeature3 />,
        title: "Multi-Language Support & Syntax Highlighting",
        description:
            "Manage code snippets in any programming language with built-in syntax highlighting. Use advanced filtering options to quickly find the exact snippet you need, when you need it.",
    },
];

export function HomeFeatureSection() {
    const [currentActiveFeature, setCurrentActiveFeature] = useState(0);
    return (
        <section className="w-full px-4 flex flex-col items-center">
            <div className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                <div className="p-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Features
                </div>
                <p className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center">
                    Effortlessly organize your code with folders, tags, and languages, share public
                    folder links, and find snippets instantly with advanced search tools.
                </p>
            </div>
            <div className="mx-auto max-w-7xl w-full p-8">
                <div className="w-full flex items-start gap-8">
                    <div className="w-full space-y-8">
                        {features.map((feature, index) => (
                            <HomeFeatureCard
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                setCurrentActiveFeature={setCurrentActiveFeature}
                                index={index}
                            />
                        ))}
                    </div>
                    <div className="sticky top-0 w-full flex h-[80vh] items-center">
                        {features.map((feature, index) => {
                            return (
                                <div
                                    className="w-full h-96 rounded-2xl hidden"
                                    key={index}
                                    style={{
                                        display: currentActiveFeature === index ? "block" : "none",
                                    }}
                                >
                                    {feature.showComponent}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
