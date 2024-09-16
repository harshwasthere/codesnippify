import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CreateSnippetFormSchema } from "@/lib/zod/schema";
import { CreateSnippetFormSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { LangsEnum } from "@/constants/global.constants";
import { bundledLanguagesInfo } from "shiki";
import { useTheme } from "next-themes";
import { codeToHtmlShiki } from "@/lib/shiki/codeToHtmlShiki";

export default function CreateSnippetSheet() {
    const theme = useTheme().theme;
    const containerRef = React.useRef(null);
    const [codeSnippet, setCodeSnippet] = React.useState("");

    const form = useForm<CreateSnippetFormSchemaTypes>({
        resolver: zodResolver(CreateSnippetFormSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            code: "",
            tags: [],
            language: "",
        },
    });

    const { title, description, code, language, tags } = form.watch();

    const handleCreateSnippet = async (data: CreateSnippetFormSchemaTypes) => {
        console.log(data);
        form.reset();
    };

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            const newTag = event.currentTarget.value.trim();
            if (newTag !== "") {
                const currentTags = form.getValues("tags");
                if (!currentTags.includes(newTag)) {
                    form.setValue("tags", [...currentTags, newTag]);
                }
                event.currentTarget.value = "";
            }
        }
    };

    React.useLayoutEffect(() => {
        if (containerRef?.current) {
            (containerRef.current as HTMLElement).firstElementChild?.classList.add("code-shiki");
            (containerRef.current as HTMLElement).querySelectorAll("code")?.forEach((el) => {
                el.classList.add("font-fira-mono");
            });
        }
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="sm" className="h-8 flex-shrink-0">
                    <Plus strokeWidth={1.5} className="size-4 mr-1" />
                    Snippet
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl w-full gap-4 flex flex-col">
                <SheetHeader className="space-y-0">
                    <SheetTitle className="text-base font-bricolage font-semibold">
                        Create Snippet
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                        Create a new snippet to save your code.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleCreateSnippet)} className="space-y-4">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Title</FormLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Snippet title"
                                        className="bg-secondary text-xs h-8"
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="tags"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Tags</FormLabel>
                                    <div className="w-full flex flex-wrap gap-2 items-center justify-start">
                                        {form.getValues("tags").map((tag: string, index) => (
                                            <TagButton
                                                key={index}
                                                tag={tag}
                                                onClick={() => {
                                                    const newTags = field.value.filter(
                                                        (t: string) => t !== tag,
                                                    );
                                                    form.setValue("tags", newTags);
                                                }}
                                            />
                                        ))}
                                        <Input
                                            type="text"
                                            placeholder="Enter tag"
                                            onKeyDown={handleAddTag}
                                            className="bg-secondary text-xs h-8 max-w-24 ml-1"
                                        />
                                    </div>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Description</FormLabel>
                                    <Textarea
                                        placeholder="Snippet description"
                                        className="bg-secondary text-xs h-28 resize-none"
                                        {...field}
                                    />
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="language"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-xs">Language</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={cn(
                                                        "w-48 justify-between bg-secondary text-xs h-8 focus:ring-2 focus:ring-primary",
                                                        !field.value && "text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value
                                                        ? LangsEnum[field.value]
                                                        : "Select language"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search language..." />
                                                <CommandList>
                                                    <CommandEmpty>No language found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {bundledLanguagesInfo.map((language) => (
                                                            <CommandItem
                                                                value={language.name}
                                                                key={language.id}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        "language",
                                                                        language.id,
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        language.id === field.value
                                                                            ? "opacity-100"
                                                                            : "opacity-0",
                                                                    )}
                                                                />
                                                                {language.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription className="text-xs">
                                        This is the language that will be used in the code.
                                    </FormDescription>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => {
                                codeToHtmlShiki({
                                    code: field.value,
                                    theme: theme === "dark" ? "vitesse-dark" : "catppuccin-latte",
                                }).then((value) => setCodeSnippet(value));

                                return (
                                    <FormItem>
                                        <FormLabel className="text-xs">Code</FormLabel>
                                        <div
                                            className="rounded-xl max-h-28 h-full overflow-auto"
                                            ref={containerRef}
                                            dangerouslySetInnerHTML={{ __html: codeSnippet }}
                                        />
                                        <Textarea
                                            placeholder="Snippet description"
                                            className="bg-secondary text-xs h-28 resize-none"
                                            {...field}
                                        />
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}

function TagButton({ onClick, tag }: { onClick: () => void; tag: string }) {
    return (
        <Button
            variant="secondary"
            size="sm"
            onClick={onClick}
            className="p-2 h-7 text-xs flex items-center justify-center gap-1 text-primary bg-primary/30 hover:bg-primary/40"
        >
            {tag}
            <X className="size-3" />
        </Button>
    );
}
