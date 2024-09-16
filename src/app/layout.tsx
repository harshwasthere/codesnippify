import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import ThemeAwareToaster from "@/components/custom/toast/ThemeAwareToaster";

const fontManrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

const fontBricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Codesnippify",
    description: "Codesnippify is a code snippet management tool",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen w-full bg-background font-sans antialiased",
                    fontBricolageGrotesque.variable,
                    fontManrope.variable,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        {children}
                        <ThemeAwareToaster />
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
