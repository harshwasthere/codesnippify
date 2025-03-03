"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function ThemeAwareToaster() {
    const { resolvedTheme } = useTheme();
    const darkTheme = resolvedTheme === "dark";

    return (
        <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
                style: {
                    background: darkTheme ? "#18181b" : "#e4e4e7",
                    color: darkTheme ? "#e4e4e7" : "#18181b",
                    fontSize: "12px",
                },
            }}
        />
    );
}
