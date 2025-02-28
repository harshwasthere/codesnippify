import { Icons } from "@/assets/icons";
import { CodeBlock, CodeBlockCode } from "@/components/custom/code-block/CodeBlock";
import { homeFeatureSectionCode } from "@/constants/constants";

// STEP 3: This is the feature section for the Syntax Highlight feature
export function SyntaxHighlightFeature() {
    return (
        <div className="w-full h-full max-w-96 pb-12 pr-4">
            <div className="relative w-full h-full min-h-[348px] max-h-96 max-w-96 flex">
                <div className="absolute bottom-8 right-10 translate-x-1/2 translate-y-1/2 flex flex-col items-center justify-center">
                    <Icons.LogoShiki className="size-28" />
                    <span className="font-semibold mt-2">Shiki 式</span>
                    <span className="text-xs text-muted-foreground">Syntax highlighter</span>
                </div>
                <CodeBlock className="border-none bg-foreground/5">
                    <CodeBlockCode
                        className="home-feature-code-block"
                        lightTheme="github-light"
                        darkTheme="github-dark"
                        code={homeFeatureSectionCode}
                        language="typescript"
                    />
                </CodeBlock>
            </div>
        </div>
    );
}
