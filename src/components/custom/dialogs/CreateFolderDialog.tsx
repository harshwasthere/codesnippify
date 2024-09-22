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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateFolderDialogSchemaTypes } from "@/types/zod.types";
import { CreateFolderDialogSchema } from "@/lib/zod/schema";
import { FolderPlus } from "lucide-react";
import { useCreateFolder } from "@/hooks/folder/useCreateFolder";

export function CreateFolderDialog() {
    const {
        mutate: createFolderMutate,
        isPending: createFolderPending,
        isError: createFolderError,
    } = useCreateFolder();

    const [isOpen, onOpenChange] = React.useState(false);
    
    const form = useForm<CreateFolderDialogSchemaTypes>({
        resolver: zodResolver(CreateFolderDialogSchema),
        mode: "onChange",
        defaultValues: {
            folderName: "",
        },
    });

    const { folderName } = form.watch();

    const onSubmit = (data: CreateFolderDialogSchemaTypes) => {
        createFolderMutate(data);
        form.reset();
        onOpenChange(false);
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" className="p-1 size-7 rounded-sm">
                    <FolderPlus strokeWidth={1.5} className="size-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-64 w-[calc(100%-1.25rem)] p-4 rounded-xl">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-bricolage font-semibold">
                        Create folder
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        Enter the name of the new folder
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                        <FormField
                            control={form.control}
                            name="folderName"
                            render={({ field }) => (
                                <FormItem>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Folder name"
                                        className="bg-secondary text-xs h-8"
                                        disabled={createFolderPending && !createFolderError}
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
                                    disabled={
                                        !form.formState.isValid ||
                                        !folderName ||
                                        (createFolderPending && !createFolderError)
                                    }
                                    className="w-full text-xs h-8"
                                >
                                    Create
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
