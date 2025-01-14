"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FolderCreateDialogSchema } from "@/lib/zod/schema";
import { FolderCreateDialogSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { cn } from "@/lib/utils";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Loader, Plus } from "lucide-react";
import { useCreateFolder } from "@/hooks/folder/useCreateFolder";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function FolderCreateDialog() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const {
        mutate: createFolderMutate,
        isPending: createFolderPending,
        isError: createFolderError,
    } = useCreateFolder();

    const form = useForm<FolderCreateDialogSchemaTypes>({
        resolver: zodResolver(FolderCreateDialogSchema),
        mode: "onChange",
        defaultValues: {
            folderName: "",
        },
    });

    const { folderName } = form.watch();

    const isSubmitDisabled =
        !form.formState.isValid || !folderName || (createFolderPending && !createFolderError);

    const onSubmit = (data: FolderCreateDialogSchemaTypes) => {
        createFolderMutate(data, {
            onSuccess: () => {
                setIsOpen(false);
                form.reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Tooltip>
                <DialogTrigger asChild>
                    <TooltipTrigger asChild>
                        <SidebarGroupAction asChild>
                            <div
                                className={cn(
                                    buttonVariants({ variant: "outline", size: "icon" }),
                                    "!size-5 text-sidebar-foreground bg-sidebar-accent cursor-pointer flex-shrink-0 right-4",
                                )}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Plus className="!size-3" />
                            </div>
                        </SidebarGroupAction>
                    </TooltipTrigger>
                </DialogTrigger>
                <TooltipContent
                    side="right"
                    align="center"
                    className="bg-foreground text-background"
                >
                    Create Folder
                </TooltipContent>
            </Tooltip>

            <DialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <DialogHeader>
                    <DialogTitle>Create Folder</DialogTitle>
                    <DialogDescription>
                        Create a new folder to organize your snippets.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="folderName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Folder Name"
                                            className="bg-secondary"
                                            disabled={createFolderPending && !createFolderError}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="max-sm:gap-2">
                            <DialogClose
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                            >
                                Cancel
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className={cn(buttonVariants({ size: "sm" }), "px-6")}
                            >
                                {createFolderPending && !createFolderError && (
                                    <Loader className="size-4 animate-spin" />
                                )}
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
