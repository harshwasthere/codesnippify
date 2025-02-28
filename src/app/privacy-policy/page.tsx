import { HomeFooter } from "@/components/custom/home/Footer";
import { HomeNavbar } from "@/components/custom/home/Navbar";
import { HomePrivacyPolicySection } from "@/components/custom/home/PrivacyPolicySection";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen h-full bg-background text-foreground scroll-smooth">
            <HomeNavbar />
            <HomePrivacyPolicySection />
            <HomeFooter className="max-w-3xl mx-auto" />
        </main>
    );
}
