import React from "react";

export function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div className="mx-auto max-w-lg md:max-w-xl sm:max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
            <div className=" p-2 pb-4 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {title}
            </div>
            <p className="text-base xs:text-lg md:text-xl font-medium leading-snug text-muted-foreground text-center max-xs:max-w-xs ">
                {description}
            </p>
        </div>
    );
}
