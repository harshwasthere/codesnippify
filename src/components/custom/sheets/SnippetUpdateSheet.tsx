import { useCreateNewSnippet } from "@/hooks/snippet/useCreateNewSnippet";
import { SnippetCreateFormSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { SnippetCreateFormSchema } from "../../../lib/zod/schema";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Edit, Loader, PlusIcon, X } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import LanguagePopover from "../popover/LanguagePopover";
import Editor from "../editor/Editor";
import { BundledLanguage } from "shiki";
import { useUpdateSnippet } from "@/hooks/snippet/useUpdateSnippet";
import React from "react";
import { Snippet } from "@/types/global.types";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface SnippetUpdateSheetProps {
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

export default function SnippetUpdateSheet({ snippet }: SnippetUpdateSheetProps) {
    const theme = useTheme().theme;

    const {
        mutate: updateSnippetMutate,
        isPending: updateSnippetPending,
        isError: updateSnippetError,
    } = useUpdateSnippet();

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
    }, [snippet, form]);

    const { title, code, language, tags } = form.watch();
    const updateSnippetDisabled =
        !form.formState.isValid ||
        !title ||
        !code ||
        !language ||
        tags.length === 0 ||
        (updateSnippetPending && !updateSnippetError);

    const handleUpdateSnippet = async (data: SnippetCreateFormSchemaTypes) => {
        updateSnippetMutate({ snippetId: snippet.snippet_id, ...data });
        form.reset();
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
        <Sheet>
            <SheetTrigger asChild onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                    <Edit className="size-4" />
                    <span>Update</span>
                </DropdownMenuItem>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xl w-full flex flex-col gap-4 p-4">
                <SheetHeader className="space-y-0">
                    <SheetTitle>Update Snippet</SheetTitle>
                    <SheetDescription>Update details of your snippet.</SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleUpdateSnippet)}
                        className="w-full h-full flex flex-col gap-4"
                    >
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Snippet title"
                                            className="bg-secondary"
                                            disabled={updateSnippetPending && !updateSnippetError}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="description"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Snippet description"
                                            className="bg-secondary max-h-28 resize-y"
                                            disabled={updateSnippetPending && !updateSnippetError}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="tags"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
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
                                                disabled={
                                                    (updateSnippetPending && !updateSnippetError) ||
                                                    field.value.length >= 7
                                                }
                                                className="bg-secondary text-xs h-8 max-w-24 ml-1"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="language"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <div>
                                        <LanguagePopover
                                            disabled={updateSnippetPending && !updateSnippetError}
                                            field={field}
                                            form={form}
                                        />
                                    </div>

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
                                return (
                                    <FormItem className="w-full h-full flex flex-col">
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Editor
                                                value={field.value}
                                                onChange={field.onChange}
                                                language={
                                                    form.getValues("language") as BundledLanguage
                                                }
                                                theme={theme as "light" | "dark" | "system"}
                                                className="bg-secondary h-full"
                                            />
                                        </FormControl>

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
            type="button"
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
