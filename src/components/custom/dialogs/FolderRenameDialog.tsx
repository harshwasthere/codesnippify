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
import { FolderRenameDialogSchema } from "@/lib/zod/schema";
import { FolderRenameDialogSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import React from "react";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRenameFolder } from "@/hooks/folder/useRenameFolder";

interface FolderRenameDialogProps {
    folderId: string;
    oldFolderName: string;
}

export function FolderRenameDialog({ folderId, oldFolderName }: FolderRenameDialogProps) {
    const {
        mutate: renameFolderMutate,
        isPending: renameFolderPending,
        isError: renameFolderError,
    } = useRenameFolder();

    const form = useForm<FolderRenameDialogSchemaTypes>({
        resolver: zodResolver(FolderRenameDialogSchema),
        mode: "onChange",
        defaultValues: {
            newFolderName: oldFolderName,
        },
    });

    const { newFolderName } = form.watch();

    const isSubmitDisabled =
        !form.formState.isValid || !newFolderName || (renameFolderPending && !renameFolderError);

    const onSubmit = ({ newFolderName }: FolderRenameDialogSchemaTypes) => {
        renameFolderMutate({ folderId, folderName: newFolderName });
        form.reset();
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                    <Edit className="size-4" />
                    <span>Rename</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle>Rename Folder</AlertDialogTitle>
                    <AlertDialogDescription>
                        Enter a new name for this folder.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="newFolderName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Folder Name"
                                            className="bg-secondary"
                                            disabled={renameFolderPending && !renameFolderError}
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
                                Rename
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
