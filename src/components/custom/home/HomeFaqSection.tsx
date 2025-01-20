import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

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
    return (
        <section className="px-4 py-12 max-w-3xl mx-auto flex flex-col items-center">
            <div className="mx-auto max-w-3xl text-balance flex flex-col items-center text-center my-20 sm:my-28 z-10">
                <div className="p-2 pb-4 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-monaSans font-extrabold leading-none tracking-tighter text-balance m-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    FAQ
                </div>
                <p className="text-lg xs:text-xl md:text-2xl font-medium leading-snug text-muted-foreground text-center">
                    Have a question? We have answers.
                </p>
            </div>
            <Accordion type="single" collapsible className="max-w-3xl w-full flex flex-col gap-2">
                {faqItems.map((item, index) => (
                    <AccordionItem
                        key={`item-${index + 1}`}
                        value={`item-${index + 1}`}
                        className="border-none w-full px-4 rounded-3xl bg-muted-foreground/10"
                    >
                        <AccordionTrigger className="md:text-lg [&[data-state=open]]:text-brand">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="md:text-lg">{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
