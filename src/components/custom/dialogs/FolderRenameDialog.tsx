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
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FolderRenameDialogSchemaTypes } from "@/types/zod.types";
import { FolderRenameDialogSchema } from "@/lib/zod/schema";
// import { Loader } from "lucide-react";

interface FolderRenameDialogProps {
    isFolderRenameDialogOpen: boolean;
    setIsFolderRenameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    oldFolderName: string;
    folderId: string;
}

export function FolderRenameDialog({
    isFolderRenameDialogOpen,
    setIsFolderRenameDialogOpen,
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
        console.log("FolderRenameDialog : ", data, folderId);
        // mutate({ convoId: convoId, newConvoName: data.newConvoName });
    };

    return (
        <AlertDialog open={isFolderRenameDialogOpen} onOpenChange={setIsFolderRenameDialogOpen}>
            <AlertDialogContent
                className="max-w-64 w-[calc(100%-1.25rem)] p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
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
                                        // disabled={isPending}
                                    />
                                    <FormMessage className="text-xs pl-2" />
                                </FormItem>
                            )}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel
                                className={cn(
                                    buttonVariants({ variant: "secondary", size: "sm" }),
                                    "w-full text-xs h-8",
                                )}
                            >
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                disabled={
                                    Object.keys(form.formState.errors).length > 0 || !newFolderName
                                }
                                type="submit"
                                className={cn(
                                    buttonVariants({ variant: "default", size: "sm" }),
                                    "w-full text-xs h-8 flex items-center",
                                )}
                            >
                                {/* {isPending && (
                                    <Loader
                                        strokeWidth={1.5}
                                        className="mr-2 size-4 animate-spin"
                                    />
                                )} */}
                                Rename
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
