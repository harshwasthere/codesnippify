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
    SheetFooter,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader, Pencil, Plus, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { BundledLanguage, bundledLanguagesInfo } from "shiki";
import { useTheme } from "next-themes";
import { codeToHtmlShiki } from "@/lib/shiki/codeToHtmlShiki";
import { langs } from "@/constants/global.constants";
import { useCreateNewSnippet } from "@/hooks/snippet/useCreateNewSnippet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useUpdateSnippet } from "@/hooks/snippet/useUpdateSnippet";
import { SnippetCreateFormSchemaTypes } from "@/types/zod.types";
import { SnippetCreateFormSchema } from "@/lib/zod/schema";

interface SnippetEditProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    snippet: {
        snippet_id: string;
        title: string;
        description: string;
        language: string;
        code: string;
        favorite: boolean;
        trash: boolean;
        created_at: string;
        folder_name: string;
        tags: string[];
    };
}

export default function SnippetUpdateSheet({ isOpen, setIsOpen, snippet }: SnippetEditProps) {
    const theme = useTheme().theme;
    const {
        mutate: updateSnippetMutate,
        isPending: updateSnippetPending,
        isError: updateSnippetError,
    } = useUpdateSnippet();

    const [snippetCode, setSnippetCode] = React.useState("");

    const form = useForm<SnippetCreateFormSchemaTypes>({
        resolver: zodResolver(SnippetCreateFormSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            code: "",
            tags: [],
            language: "",
        },
    });

    React.useEffect(() => {
        form.reset({
            title: snippet.title,
            description: snippet.description,
            code: snippet.code,
            tags: snippet.tags,
            language: snippet.language,
        });
    }, [snippet, form, isOpen]);

    const { title, code, language, tags } = form.watch();
    const updateSnippetDisabled =
        !form.formState.isValid ||
        !title ||
        !code ||
        !language ||
        tags.length === 0 ||
        (updateSnippetPending && !updateSnippetError);

    const handleCreateSnippet = async (data: SnippetCreateFormSchemaTypes) => {
        updateSnippetMutate({ snippetId: snippet.snippet_id, ...data });
        form.reset();
        setIsOpen(false);
    };

    const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            const newTag = event.currentTarget.value.trim().toLowerCase();
            if (newTag !== "") {
                const currentTags = form.getValues("tags");
                if (!currentTags.includes(newTag)) {
                    form.setValue("tags", [...currentTags, newTag]);
                }
                event.currentTarget.value = "";
            }
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="sm:max-w-xl w-full gap-4 flex flex-col">
                <SheetHeader className="space-y-0">
                    <SheetTitle className="text-base font-bricolage font-semibold">
                        Edit Snippet
                    </SheetTitle>
                    <SheetDescription className="text-xs">
                        Change the details of the snippet.
                    </SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleCreateSnippet)}
                        className="space-y-4 w-full h-full flex flex-col"
                    >
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
                                        disabled={updateSnippetPending && !updateSnippetError}
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
                                            disabled={updateSnippetPending && !updateSnippetError}
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
                                        disabled={updateSnippetPending && !updateSnippetError}
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
                                                    disabled={
                                                        updateSnippetPending && !updateSnippetError
                                                    }
                                                >
                                                    {field.value
                                                        ? langs.find(
                                                              (lang) => lang.id === field.value,
                                                          )?.name
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
                                    theme: theme,
                                    lang: form.getValues("language") as BundledLanguage,
                                }).then((value) => setSnippetCode(value));

                                return (
                                    <FormItem className="w-full h-full flex flex-col">
                                        <FormLabel className="text-xs">Code</FormLabel>
                                        <ScrollArea className="relative w-full h-full create-snippet-code">
                                            <ScrollBar orientation="horizontal" />
                                            <ScrollBar orientation="vertical" />

                                            <div
                                                dangerouslySetInnerHTML={{ __html: snippetCode }}
                                            />
                                            <Textarea
                                                spellCheck={false}
                                                placeholder="Snippet code"
                                                className="absolute inset-0 w-full h-full p-5 m-0 font-mono text-xs outline-none border-none overflow-auto  rounded-md whitespace-nowrap bg-transparent text-transparent caret-foreground z-10"
                                                {...field}
                                                disabled={
                                                    updateSnippetPending && !updateSnippetError
                                                }
                                            />
                                        </ScrollArea>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                );
                            }}
                        />

                        <SheetFooter>
                            <Button
                                type="submit"
                                className="h-8 bg-primary text-xs"
                                disabled={updateSnippetDisabled}
                            >
                                {updateSnippetPending && !updateSnippetError && (
                                    <Loader className="mr-2 size-4 animate-spin" />
                                )}
                                Update
                            </Button>
                        </SheetFooter>
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
