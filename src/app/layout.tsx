import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import ThemeAwareToaster from "@/components/custom/toast/ThemeAwareToaster";
import { GlobalStoreProvider } from "@/providers/GlobalStoreProvider";

const ubuntu = Ubuntu({
    subsets: ["latin"],
    variable: "--font-ubuntu",
    weight: ["300", "400", "500", "700"],
});

const ubuntuMono = Ubuntu_Mono({
    subsets: ["latin"],
    variable: "--font-ubuntu-mono",
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "Codesnippify",
    description: "Codesnippify is a platform for sharing and discovering code snippets.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body
                className={cn(
                    "min-h-screen w-full bg-background font-ubuntu antialiased",
                    ubuntu.variable,
                    ubuntuMono.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <GlobalStoreProvider>
                        <QueryProvider>
                            {children}
                            <ThemeAwareToaster />
                        </QueryProvider>
                    </GlobalStoreProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
