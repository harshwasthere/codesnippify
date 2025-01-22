import { useInView } from "framer-motion";
import React from "react";

export function HomeFeatureCard({
    title,
    description,
    setCurrentActiveFeature,
    index,
}: {
    title: string;
    description: string;
    setCurrentActiveFeature: (index: number) => void;
    index: number;
}) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
        margin: "-50% 0px -50% 0px",
    });

    React.useEffect(() => {
        if (isInView) {
            setCurrentActiveFeature(index);
        }
    }, [isInView, index, setCurrentActiveFeature]);

    return (
        <div ref={ref} className="w-full h-[80vh] flex flex-col items-start justify-center gap-4">
            <h3 className="text-2xl font-bold font-monaSans bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
            </h3>
            <p className="text-lg font-medium text-muted-foreground text-balance">{description}</p>
        </div>
    );
}
