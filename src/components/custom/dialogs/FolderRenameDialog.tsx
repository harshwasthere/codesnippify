"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Edit3, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogFooter,
} from "../responsive-dialog/ResponsiveDialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FolderRenameDialogSchema } from "@/lib/schemas";
import { FolderRenameDialogSchemaTypes } from "@/types/zod.types";
import { useRenameFolder } from "@/hooks/folder/useRenameFolder";

interface FolderRenameDialogProps {
    folderId: string;
    oldFolderName: string;
}

export function FolderRenameDialog({ folderId, oldFolderName }: FolderRenameDialogProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const form = useForm<FolderRenameDialogSchemaTypes>({
        resolver: zodResolver(FolderRenameDialogSchema),
        mode: "onChange",
        defaultValues: {
            newFolderName: oldFolderName,
        },
    });

    const { mutate: renameFolderMutate, isPending: renameFolderPending } = useRenameFolder();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = renameFolderPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const onSubmit = async ({ newFolderName }: FolderRenameDialogSchemaTypes) => {
        renameFolderMutate(
            { folderId, folderName: newFolderName },
            {
                onSuccess: () => {
                    setIsOpen(false);
                    form.reset();
                },
            },
        );
    };

    return (
        <ResponsiveDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Rename Folder"
            description="Enter a new name for this folder."
            trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                    <Edit3 className="size-4" />
                    <span>Rename</span>
                </DropdownMenuItem>
            }
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="newFolderName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Folder Name"
                                        className="bg-secondary"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ResponsiveDialogFooter className="px-0">
                        <ResponsiveDialogClose
                            className={cn(buttonVariants({ variant: "outline" }))}
                        >
                            Cancel
                        </ResponsiveDialogClose>
                        <Button type="submit" disabled={isSubmitDisabled} className="px-6">
                            {isLoading && <Loader className="size-4 animate-spin" />}
                            Rename
                        </Button>
                    </ResponsiveDialogFooter>
                </form>
            </Form>
        </ResponsiveDialog>
    );
}
