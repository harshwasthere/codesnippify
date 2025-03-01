import { HomeFooter } from "@/components/custom/home/Footer";
import { HomeNavbar } from "@/components/custom/home/Navbar";
import { TermsofServiceSection } from "@/components/custom/home/TermsOfServiceSection";

export default function TermsOfService() {
    return (
        <main className="min-h-screen h-full bg-background text-foreground scroll-smooth">
            <HomeNavbar />
            <TermsofServiceSection />
            <HomeFooter className="max-w-3xl mx-auto" />
        </main>
    );
}
