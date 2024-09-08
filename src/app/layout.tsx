import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque, Fira_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const fontManrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
});

const fontBricolageGrotesque = Bricolage_Grotesque({
    subsets: ["latin"],
    variable: "--font-bricolage-grotesque",
});

const fontFiraMono = Fira_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-fira-mono",
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
                    "min-h-screen bg-background font-sans antialiased",
                    fontBricolageGrotesque.variable,
                    fontManrope.variable,
                    fontFiraMono.variable,
                )}
            >
                {children}
                <Toaster position="bottom-center" reverseOrder={false} />
            </body>
        </html>
    );
}
