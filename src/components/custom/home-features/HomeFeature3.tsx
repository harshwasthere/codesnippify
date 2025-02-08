import { Icons } from "@/assets/icons";
import { useShikiHighlighter } from "@/hooks/ui/useShikiHighlighter";
import { BundledLanguage } from "shiki";

const codeSection = {
    language: "javascript",
    code: `// Create and save a snippet
const snippet = {
  title: "Hello World",
  language: "JavaScript",
  code: "console.log('Hello, World!');",
};

// Save snippet
saveSnippet(snippet);

function saveSnippet(snippet) {
  console.log(\`Snippet saved!\`);
}
`,
};

export function HomeFeature3() {
    const html = useShikiHighlighter(codeSection.code, codeSection.language as BundledLanguage);
    return (
        <div className="relative w-full h-ful max-h-[384px] flex items-start gap-8">
            <div className="absolute bottom-5 right-5 translate-x-1/2 translate-y-1/2 flex flex-col items-center justify-center">
                <Icons.LogoShiki className="size-32" />
                <span className="text-lg font-bold text-brand !mt-2">Shiki 式</span>
                <span className="text-sm font-semibold text-muted-foreground">
                    Syntax highlighter
                </span>
            </div>
            <div className="w-full h-full bg-brand/20 rounded-3xl p-4">
                <div className="shikicode-homepage" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}
