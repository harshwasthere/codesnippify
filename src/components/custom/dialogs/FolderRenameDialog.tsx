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
import { FolderRenameDialogSchema } from "@/lib/zod/schema";
import { FolderRenameDialogSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader } from "lucide-react";
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
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                    <Edit className="size-4" />
                    <span>Rename</span>
                </DropdownMenuItem>
            </DialogTrigger>

            <DialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <DialogHeader>
                    <DialogTitle>Rename Folder</DialogTitle>
                    <DialogDescription>Enter a new name for this folder.</DialogDescription>
                </DialogHeader>
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
                                {renameFolderPending && !renameFolderError && (
                                    <Loader className="size-4 animate-spin" />
                                )}
                                Rename
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
