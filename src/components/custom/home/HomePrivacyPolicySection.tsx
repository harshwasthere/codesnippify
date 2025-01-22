import { Icons } from "@/assets/icons";

const privacyPolicy = [
    {
        title: "Information We Collect",
        description:
            "We collect information you provide, such as account details (name, email, password) and content (snippets, tags, folders). We also collect usage data, device information, and cookies automatically.",
    },
    {
        title: "How We Use Your Information",
        description:
            "Your information is used to provide and improve the platform, secure your account, personalize recommendations, communicate updates, and analyze performance.",
    },
    {
        title: "Sharing Your Information",
        description:
            "We do not sell or share your personal information, except with your consent, for legal compliance, or with trusted service providers for platform operations.",
    },
    {
        title: "Your Data Rights",
        description:
            "You can access, edit, or delete your personal information, restrict public sharing of snippets, and contact us for any data-related requests.",
    },
    {
        title: "Data Security",
        description:
            "We use industry-standard encryption and security measures to protect your data. However, no method of transmission or storage is 100% secure.",
    },
    {
        title: "Cookies and Tracking Technologies",
        description:
            "We use cookies to improve your experience and track platform usage. You can disable cookies in your browser settings, but some features may be limited.",
    },
    {
        title: "Third-Party Links",
        description:
            "Codesnippify may contain links to third-party websites or services. We are not responsible for their privacy practices, and we recommend reviewing their privacy policies.",
    },
    {
        title: "Updates to This Privacy Policy",
        description:
            "This Privacy Policy may be updated periodically. Changes will be reflected with a new effective date, and continued use signifies acceptance of the updates.",
    },
    {
        title: "Contact Us",
        description:
            "For any questions or concerns about this Privacy Policy, contact us at team@codesnippify.me",
    },
];

export function HomePrivacyPolicySection() {
    return (
        <section className="px-4 py-20 max-w-2xl mx-auto flex flex-col items-center">
            <div className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center gap-8 mb-16 z-10">
                <div className="relative">
                    <Icons.LogoCodesnippify className="size-20 md:size-24 z-50" />
                    <div className="absolute inset-3 bg-brand blur-3xl"></div>
                </div>
                <div className="p-2 pb-4 text-4xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Privacy Policy
                </div>
            </div>

            <article className="prose prose-neutral dark:prose-invert prose-h4:leading-none prose-h4:font-monaSans prose-h4:font-bold prose-p:leading-snug prose-p:text-muted-foreground">
                {privacyPolicy.map((section) => (
                    <div key={section.title} className="flex flex-col">
                        <h4>{section.title}</h4>
                        <p>{section.description}</p>
                    </div>
                ))}
            </article>
        </section>
    );
}
