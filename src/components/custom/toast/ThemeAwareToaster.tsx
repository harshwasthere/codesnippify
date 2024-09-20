"use client";

import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function ThemeAwareToaster() {
    const { theme } = useTheme();

    const darkTheme = theme === "dark" || theme === "system";

    return (
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
                style: {
                    background: darkTheme ? "#333" : "#fff",
                    color: darkTheme ? "#fff" : "#333",
                    fontSize: "14px",
                },
            }}
        />
    );
}
