import { HomeNavbar } from "@/components/custom/home/HomeNavbar";
import { HomeFooter } from "@/components/custom/home/HomeFooter";
import { HomeTermsOfServiceSection } from "@/components/custom/home/HomeTermsOfServiceSection";

export default function page() {
    return (
        <main className="min-h-screen h-full bg-background text-foreground font-sans">
            <HomeNavbar />
            <HomeTermsOfServiceSection />
            <HomeFooter className="max-w-3xl mx-auto" />
        </main>
    );
}
