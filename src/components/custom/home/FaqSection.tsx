import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "./SectionHeader";
import * as motion from "motion/react-client";

const faqItems = [
    {
        question: "How does Codesnippify work?",
        answer: "Codesnippify is a platform that allows you to share and discover code snippets. You can create folders to organize your snippets, add tags to them, and even share them with others.",
    },
    {
        question: "Is Codesnippify free to use?",
        answer: "Yes, Codesnippify is completely free to use! You can create an account and start sharing your code snippets right away without any cost.",
    },
    {
        question: "What programming languages does Codesnippify support?",
        answer: "Codesnippify supports syntax highlighting for all major programming languages including JavaScript, Python, Java, C++, Ruby, and many more. You can share snippets in any language you work with.",
    },
    {
        question: "Can I collaborate with others on Codesnippify?",
        answer: "Absolutely! Codesnippify makes it easy to collaborate with others by sharing your snippet collections. You can create shared folders and invite team members to view and contribute to your code snippets.",
    },
];

export function HomeFaqSection() {
    const containerAnimation = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                duration: 0.5,
            },
        },
    };

    return (
        <section id="faq" className="w-full px-4 sm:px-8 py-12 flex flex-col items-center">
            <SectionHeader title="FAQ" description="Have a question? We have answers." />
            <motion.div
                variants={containerAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="max-w-3xl w-full flex flex-col gap-2"
            >
                <Accordion type="single" collapsible className="w-full flex flex-col gap-2">
                    {faqItems.map((item, index) => (
                        <motion.div key={`item-${index + 1}`} variants={itemAnimation}>
                            <AccordionItem
                                value={`item-${index + 1}`}
                                className="border-none w-full px-4 rounded-xl bg-foreground/5"
                            >
                                <AccordionTrigger className="md:text-lg [&[data-state=open]]:text-primary">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="md:text-base">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </motion.div>
        </section>
    );
}
