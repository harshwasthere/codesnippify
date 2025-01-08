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
                    background: darkTheme ? "#07112e" : "#fff",
                    color: darkTheme ? "#fff" : "#07112e",
                    fontSize: "14px",
                },
            }}
        />
    );
}
