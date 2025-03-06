"use client";

import { useCreateNewSnippet } from "@/hooks/snippet/useCreateNewSnippet";
import { SnippetCreateUpdateFormSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SnippetCreateUpdateFormSchema } from "@/lib/schemas";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader, PlusIcon, X } from "lucide-react";
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
import { LanguagePopover } from "@/components/custom/popovers/LanguagePopover";
import { Editor } from "@/components/custom/editor/Editor";
import { BundledLanguage } from "shiki";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function SnippetCreateSheet() {
    const [isOpen, setIsOpen] = React.useState(false);

    const form = useForm<SnippetCreateUpdateFormSchemaTypes>({
        resolver: zodResolver(SnippetCreateUpdateFormSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            code: "",
            tags: [],
            language: "",
        },
    });

    const { mutate: createSnippetMutate, isPending: createSnippetPending } = useCreateNewSnippet();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = createSnippetPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const handleCreateSnippet = async (data: SnippetCreateUpdateFormSchemaTypes) => {
        createSnippetMutate(data, {
            onSuccess: () => {
                setIsOpen(false);
                form.reset();
            },
        });
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
            <Tooltip>
                <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                        <Button size="sm" className="h-8 flex-shrink-0 gap-1 max-2xs:px-2">
                            <PlusIcon className="size-4" />
                            <span className="max-2xs:hidden">Snippet</span>
                        </Button>
                    </SheetTrigger>
                </TooltipTrigger>
                <TooltipContent
                    side="bottom"
                    sideOffset={8}
                    align="center"
                    className="bg-foreground text-background"
                >
                    Create Snippet
                </TooltipContent>
            </Tooltip>

            <SheetContent className="sm:max-w-xl w-full flex flex-col gap-4 p-4">
                <SheetHeader>
                    <SheetTitle>Create Snippet</SheetTitle>
                    <SheetDescription>Create a new snippet to save your code.</SheetDescription>
                </SheetHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleCreateSnippet)}
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
                                            placeholder="Title of your snippet"
                                            className="bg-foreground/5"
                                            disabled={isLoading}
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                            placeholder="Describe about your code snippet"
                                            className="bg-foreground/5 max-h-28 resize-y"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
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
                                                disabled={isLoading || field.value.length >= 7}
                                                className="bg-foreground/5 max-w-24 ml-2"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="language"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Language</FormLabel>
                                    <FormControl>
                                        <div>
                                            <LanguagePopover
                                                disabled={isLoading}
                                                field={field}
                                                form={form}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-xs">
                                        This is the language that will be used in the code.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="code"
                            control={form.control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="w-full h-full flex flex-col flex-grow">
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Editor
                                                value={field.value}
                                                onChange={field.onChange}
                                                language={
                                                    form.getValues("language") as BundledLanguage
                                                }
                                                disabled={isLoading}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <SheetFooter className="max-sm:flex-row max-sm:justify-end gap-2">
                            <SheetClose className={cn(buttonVariants({ variant: "outline" }))}>
                                Close
                            </SheetClose>
                            <Button type="submit" disabled={isSubmitDisabled} className="px-6">
                                {isLoading && <Loader className="size-4 animate-spin" />}
                                Create
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
            className="text-muted-foreground bg-foreground/5 hover:bg-foreground/10"
        >
            {tag}
            <X className="size-4" />
        </Button>
    );
}
