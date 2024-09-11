"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function ThemeAwareToaster() {
    const { theme } = useTheme();

    return (
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
                style: {
                    background: theme === "dark" ? "#333" : "#fff",
                    color: theme === "dark" ? "#fff" : "#333",
                    fontSize: "14px",
                },
            }}
        />
    );
}
