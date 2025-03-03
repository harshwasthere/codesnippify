"use client";

import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    ResponsiveDialog,
    ResponsiveDialogClose,
    ResponsiveDialogFooter,
} from "../responsive-dialog/ResponsiveDialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FolderCreateDialogSchema } from "@/lib/schemas";
import { FolderCreateDialogSchemaTypes } from "@/types/zod.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { cn } from "@/lib/utils";
import { SidebarGroupAction } from "@/components/ui/sidebar";
import { Loader, Plus } from "lucide-react";
import { useCreateFolder } from "@/hooks/folder/useCreateFolder";

export function FolderCreateDialog() {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const form = useForm<FolderCreateDialogSchemaTypes>({
        resolver: zodResolver(FolderCreateDialogSchema),
        mode: "onChange",
        defaultValues: {
            folderName: "",
        },
    });

    const { mutate: createFolderMutate, isPending: createFolderPending } = useCreateFolder();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = createFolderPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const onSubmit = (data: FolderCreateDialogSchemaTypes) => {
        createFolderMutate(data, {
            onSuccess: () => {
                setIsOpen(false);
                form.reset();
            },
        });
    };

    return (
        <ResponsiveDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Create Folder"
            description="Create a new folder to organize your snippets."
            trigger={
                <SidebarGroupAction asChild>
                    <div
                        className={cn(
                            buttonVariants({ variant: "outline", size: "icon" }),
                            "size-5 rounded-sm text-sidebar-foreground bg-muted-foreground/10 hover:bg-muted-foreground/15 cursor-pointer flex-shrink-0",
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Plus className="!size-3" />
                    </div>
                </SidebarGroupAction>
            }
            tooltip="Create Folder"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="folderName"
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
                            Create
                        </Button>
                    </ResponsiveDialogFooter>
                </form>
            </Form>
        </ResponsiveDialog>
    );
}
