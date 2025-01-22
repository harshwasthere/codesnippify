import { Icons } from "@/assets/icons";

const termsOfService = [
    {
        title: "Acceptance of Terms",
        description:
            "By using Codesnippify, you acknowledge that you have read, understood, and agree to these terms. If you are using the platform on behalf of an organization, you confirm that you have the authority to bind that organization to these terms.",
    },
    {
        title: "Account Responsibilities",
        description:
            "You are responsible for maintaining the confidentiality of your account credentials and ensuring all information provided is accurate. Notify us immediately of any unauthorized access or security breach related to your account. You must not share your account or allow others to access it.",
    },
    {
        title: "Permitted Use",
        description:
            "You agree to use Codesnippify only for lawful purposes and in accordance with these terms. You must not use the platform to post illegal, harmful, or offensive content, reverse engineer or tamper with the platform, or exploit it for unauthorized commercial purposes.",
    },
    {
        title: "Intellectual Property",
        description:
            "All content, trademarks, and services on Codesnippify are the intellectual property of Codesnippify or its licensors. You may not copy, modify, or distribute this content without prior written permission.",
    },
    {
        title: "User-Generated Content",
        description:
            "You retain ownership of any code snippets or content you upload. By uploading content, you grant Codesnippify a non-exclusive, worldwide, royalty-free license to display and use the content as needed for the platform's operation. You are responsible for ensuring your content does not violate any laws or third-party rights.",
    },
    {
        title: "Privacy",
        description:
            "Your use of Codesnippify is governed by our Privacy Policy, which explains how we collect, use, and protect your information. By using the platform, you agree to the terms outlined in the Privacy Policy.",
    },
    {
        title: "Termination",
        description:
            "We reserve the right to suspend or terminate your access to Codesnippify at any time, without notice, if you violate these terms or engage in prohibited activities.",
    },
    {
        title: "Disclaimer of Warranties",
        description:
            "Codesnippify is provided 'as is' without warranties of any kind. We do not guarantee that the platform will be error-free, secure, or available at all times.",
    },
    {
        title: "Limitation of Liability",
        description:
            "To the fullest extent permitted by law, Codesnippify will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform.",
    },
    {
        title: "Changes to Terms",
        description:
            "We may update these Terms of Service from time to time. Changes will be effective immediately upon posting. Your continued use of the platform signifies your acceptance of the updated terms.",
    },
    {
        title: "Governing Law",
        description:
            "These terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles.",
    },
    {
        title: "Contact Us",
        description:
            "If you have any questions or concerns about these Terms of Service, please contact us at team@codesnippify.me",
    },
];

export function HomeTermsOfServiceSection() {
    return (
        <section className="px-4 py-20 max-w-2xl mx-auto flex flex-col items-center">
            <div className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center gap-8 mb-16 z-10">
                <div className="relative">
                    <Icons.LogoCodesnippify className="size-20 md:size-24 z-50" />
                    <div className="absolute inset-3 bg-brand blur-3xl"></div>
                </div>
                <div className="p-2 pb-4 text-4xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    Terms of Service
                </div>
            </div>

            <article className="prose prose-neutral dark:prose-invert prose-h4:leading-none prose-h4:font-monaSans prose-h4:font-bold prose-p:leading-snug prose-p:text-muted-foreground">
                {termsOfService.map((section) => (
                    <div key={section.title} className="flex flex-col">
                        <h4>{section.title}</h4>
                        <p>{section.description}</p>
                    </div>
                ))}
            </article>
        </section>
    );
}
