"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FolderCreateDialogSchema } from "@/lib/zod/schema";
import { FolderCreateDialogSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { cn } from "@/lib/utils";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useCreateFolder } from "@/hooks/folder/useCreateFolder";

export function FolderCreateDialog() {
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
        createFolderMutate(data);
        form.reset();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                <SidebarGroupAction asChild>
                    <div
                        className={cn(
                            buttonVariants({ variant: "outline", size: "icon" }),
                            "!size-5 text-sidebar-foreground cursor-pointer flex-shrink-0 right-4",
                        )}
                    >
                        <Plus className="!size-3" />
                    </div>
                </SidebarGroupAction>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle>Create Folder</AlertDialogTitle>
                    <AlertDialogDescription>
                        Create a new folder to organize your snippets.
                    </AlertDialogDescription>
                </AlertDialogHeader>
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
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                            >
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                type="submit"
                                disabled={isSubmitDisabled}
                                className={cn(buttonVariants({ size: "sm" }), "px-6")}
                            >
                                Create
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
