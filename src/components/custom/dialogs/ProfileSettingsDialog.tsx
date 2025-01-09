"use client";

import React, { ChangeEvent } from "react";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProfileSettingsFormSchemaTypes } from "@/types/zod.types";
import { ProfileSettingsFormSchema } from "@/lib/zod/schema";
import { Profile } from "@/types/global.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Pencil, Settings } from "lucide-react";
import { useUpdateUserProfile } from "@/hooks/user/useUpdateUserProfile";
import toast from "react-hot-toast";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";

interface ProfileSettingsDialogProps {
    profile: Profile | null | undefined;
}

export function ProfileSettingsDialog({ profile }: ProfileSettingsDialogProps) {
    const {
        mutate: updateUserProfileMutate,
        isPending: updateUserProfilePending,
        isError: updateUserProfileError,
    } = useUpdateUserProfile();

    const form = useForm<ProfileSettingsFormSchemaTypes>({
        resolver: zodResolver(ProfileSettingsFormSchema),
        mode: "onChange",
        defaultValues: {
            newFullName: profile?.full_name ?? "",
        },
    });

    React.useEffect(() => {
        form.reset({ newFullName: profile?.full_name ?? "" });
    }, [profile, form]);

    const { newFullName } = form.watch();

    const avatarInputRef = React.useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

    const handleProfileUpdate = async ({ newFullName }: ProfileSettingsFormSchemaTypes) => {
        updateUserProfileMutate(
            {
                newName: newFullName,
                newAvatar: avatarFile,
            },
            {
                onSuccess: () => {
                    toast.success("Profile updated successfully!");
                },
            },
        );

        setAvatarFile(null);
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="group cursor-pointer"
                >
                    <Settings className="mr-2 size-4" />
                    <span className="text-xs">Settings</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-md">
                <AlertDialogHeader className="space-y-0">
                    <AlertDialogTitle className="text-sm font-semibold">Settings</AlertDialogTitle>
                    <AlertDialogDescription className="text-xs">
                        Update your profile settings
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="w-full flex flex-col sm:flex-row items-center rounded-sm bg-secondary p-4 dark:bg-secondary/30 gap-4 overflow-hidden">
                    <div className="relative">
                        <Avatar className="size-20 rounded-full border-2 border-muted">
                            <AvatarImage
                                src={
                                    avatarFile
                                        ? URL.createObjectURL(avatarFile)
                                        : profile?.avatar_url
                                }
                                className="object-cover rounded-sm"
                                alt="profile-picture"
                            />
                            <AvatarFallback className="rounded-sm">
                                {profile?.full_name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            onClick={() => avatarInputRef.current?.click()}
                            variant="outline"
                            size="icon"
                            className="size-6 absolute top-0 -right-1"
                        >
                            <Pencil className="!size-3" />
                        </Button>
                        <input
                            ref={avatarInputRef}
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setAvatarFile(file);
                                }
                            }}
                        />
                    </div>

                    <section className="flex w-full h-full flex-col items-center sm:items-start justify-center overflow-hidden gap-2">
                        <div className="w-full flex flex-col items-center sm:items-start">
                            <div className="flex items-center gap-1">
                                <CardTitle className="max-w-44 w-auto text-base font-semibold text-muted-foreground truncate capitalize">
                                    {profile?.full_name ?? "User name"}
                                </CardTitle>
                                <Badge
                                    className={cn(
                                        "z-50 text-[10px]",
                                        profile?.subscription_status === "pro"
                                            ? " bg-primary/90 hover:bg-primary"
                                            : "bg-green-600 hover:bg-green-700",
                                    )}
                                >
                                    {profile?.subscription_status ?? "free"}
                                </Badge>
                            </div>
                            <CardDescription className="max-w-44 w-auto text-xs truncate first-letter:capitalize">
                                {profile?.email ?? "mail@gmail.com"}
                            </CardDescription>
                        </div>
                        <Badge
                            variant="secondary"
                            className="w-fit text-[10px] text-primary rounded-sm bg-primary/20 hover:bg-primary/30"
                        >
                            {profile?.total_snippets} SNIPPETS CREATED
                        </Badge>
                    </section>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleProfileUpdate)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="newFullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs">Name</FormLabel>
                                    <Input
                                        {...field}
                                        type="text"
                                        placeholder="Name"
                                        className="bg-secondary"
                                        disabled={
                                            updateUserProfilePending && !updateUserProfileError
                                        }
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
                                        !newFullName ||
                                        (updateUserProfilePending && !updateUserProfileError)
                                    }
                                    className="w-full text-xs h-8"
                                >
                                    Update
                                </Button>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </form>
                </Form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
