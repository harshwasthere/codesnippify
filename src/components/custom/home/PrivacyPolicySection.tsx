import { Icons } from "@/assets/icons";
import * as motion from "motion/react-client";

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
        description: (
            <>
                For any questions or concerns about this Privacy Policy, contact us at{" "}
                <a
                    href="mailto:team@codesnippify.me"
                    className="font-medium text-primary hover:underline"
                >
                    team@codesnippify.me
                </a>
            </>
        ),
    },
];

const privacyAnimations = {
    fadeInUp: {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    },
    fadeInGlow: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.8,
            transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
        },
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
};

export function HomePrivacyPolicySection() {
    return (
        <section className="m-auto max-w-2xl flex flex-col items-center px-4 py-20 gap-20">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={privacyAnimations.staggerContainer}
                className="mx-auto flex flex-col items-center text-center text-balance gap-8"
            >
                <motion.div variants={privacyAnimations.fadeInUp} className="relative">
                    <Icons.LogoCodesnippify className="size-20 md:size-24 z-50" />
                    <motion.div
                        variants={privacyAnimations.fadeInGlow}
                        className="absolute inset-3 bg-primary blur-3xl"
                    ></motion.div>
                </motion.div>
                <motion.div
                    variants={privacyAnimations.fadeInUp}
                    className="p-2 pb-4 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent text-center"
                >
                    Privacy Policy
                </motion.div>
            </motion.div>

            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-neutral dark:prose-invert prose-h4:leading-none prose-h4:font-bold prose-p:leading-snug prose-p:text-muted-foreground"
            >
                {privacyPolicy.map((section, index) => (
                    <motion.div
                        key={section.title}
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index + 0.4 }}
                    >
                        <h4>{section.title}</h4>
                        <p>{section.description}</p>
                    </motion.div>
                ))}
            </motion.article>
        </section>
    );
}
