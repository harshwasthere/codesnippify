"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { FolderRenameDialogSchemaTypes } from "@/types/zod.types";
import { FolderRenameDialogSchema } from "@/lib/zod/schema";


interface FolderRenameDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    oldFolderName: string;
    folderId: string;
}

export function FolderRenameDialog({
    isOpen,
    onOpenChange,
    oldFolderName,
    folderId,
}: FolderRenameDialogProps) {
    const form = useForm<FolderRenameDialogSchemaTypes>({
        resolver: zodResolver(FolderRenameDialogSchema),
        mode: "onChange",
        defaultValues: {
            newFolderName: oldFolderName,
        },
    });

    const { newFolderName } = form.watch();

    const onSubmit = async (data: FolderRenameDialogSchemaTypes) => {
        // onRename(data.newFolderName, folderId);
        onOpenChange(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-64 w-[calc(100%-1.25rem)] p-4 rounded-xl">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                        Rename Folder
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        Enter the new name for this folder
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="newFolderName"
                            render={({ field }) => (
                                <FormItem>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Untitled"
                                        className="bg-secondary text-xs h-8"
                                    />
                                    <FormMessage className="text-xs pl-2" />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full text-xs h-8"
                                >
                                    Cancel
                                </Button>
                            </AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    type="submit"
                                    disabled={!form.formState.isValid || !newFolderName}
                                    className="w-full text-xs h-8"
                                >
                                    Rename
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
