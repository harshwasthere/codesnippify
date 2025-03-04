"use client";

import React, { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SettingsFormSchemaTypes } from "@/types/zod.types";
import { SettingsFormSchema } from "@/lib/schemas";
import { Profile } from "@/types/common.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResponsiveDialogClose } from "../responsive-dialog/ResponsiveDialog";
import { ResponsiveDialogFooter } from "../responsive-dialog/ResponsiveDialog";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Loader, Pencil, Settings } from "lucide-react";
import { useUpdateUserProfile } from "@/hooks/user/useUpdateUserProfile";
import toast from "react-hot-toast";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ResponsiveDialog } from "../responsive-dialog/ResponsiveDialog";

interface SettingsDialogProps {
    profile: Profile | null | undefined;
}

export function SettingsDialog({ profile }: SettingsDialogProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const form = useForm<SettingsFormSchemaTypes>({
        resolver: zodResolver(SettingsFormSchema),
        mode: "onChange",
        defaultValues: {
            newFullName: profile?.full_name ?? "",
        },
    });

    React.useEffect(() => {
        form.reset({ newFullName: profile?.full_name ?? "" });
    }, [profile]);

    const { mutate: updateUserProfileMutate, isPending: updateUserProfilePending } =
        useUpdateUserProfile();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = updateUserProfilePending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const avatarInputRef = React.useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

    const handleProfileUpdate = async ({ newFullName }: SettingsFormSchemaTypes) => {
        updateUserProfileMutate(
            {
                newName: newFullName,
                newAvatar: avatarFile,
            },
            {
                onSuccess: () => {
                    toast.success("Profile updated successfully!");
                    setIsOpen(false);
                    setAvatarFile(null);
                },
            },
        );
    };

    return (
        <ResponsiveDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Settings"
            description="Update your profile settings"
            trigger={
                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                    <Settings className="mr-2 size-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
            }
        >
            <div className="w-full flex flex-col gap-4">
                <ProfileInfo
                    profile={profile}
                    avatarFile={avatarFile}
                    setAvatarFile={setAvatarFile}
                    avatarInputRef={avatarInputRef}
                />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleProfileUpdate)}
                        className="w-full flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="newFullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Your full name"
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
                                Update
                            </Button>
                        </ResponsiveDialogFooter>
                    </form>
                </Form>
            </div>
        </ResponsiveDialog>
    );
}

interface ProfileInfoProps {
    profile: Profile | null | undefined;
    avatarFile: File | null;
    setAvatarFile: (file: File | null) => void;
    avatarInputRef: React.RefObject<HTMLInputElement>;
}

export function ProfileInfo({
    profile,
    avatarFile,
    setAvatarFile,
    avatarInputRef,
}: ProfileInfoProps) {
    return (
        <div className="w-full flex flex-col sm:flex-row items-center rounded-md bg-foreground/5 p-6 gap-6 overflow-hidden">
            <div className="relative">
                <Avatar className="size-20 rounded-full">
                    <AvatarImage
                        src={avatarFile ? URL.createObjectURL(avatarFile) : profile?.avatar_url}
                        className="object-cover rounded-full"
                        alt="profile-picture"
                    />
                    <AvatarFallback className="rounded-full">
                        {profile?.full_name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={() => avatarInputRef.current?.click()}
                    className="size-6 absolute top-0 right-0"
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
                        <CardTitle className="max-w-44 w-auto text-base font-semibold truncate capitalize">
                            {profile?.full_name ?? "User name"}
                        </CardTitle>
                        <Badge
                            className={cn(
                                "z-50 text-xs uppercase",
                                profile?.subscription_status === "pro"
                                    ? " bg-primary/90 hover:bg-primary"
                                    : "bg-green-600 hover:bg-green-700",
                            )}
                        >
                            {profile?.subscription_status ?? "free"}
                        </Badge>
                    </div>
                    <CardDescription className="max-w-44 w-auto text-sm truncate first-letter:capitalize">
                        {profile?.email ?? "mail@gmail.com"}
                    </CardDescription>
                </div>
                <Badge
                    variant="secondary"
                    className="w-fit text-xs text-primary rounded-sm bg-primary/20 hover:bg-primary/30"
                >
                    {profile?.total_snippets} SNIPPETS CREATED
                </Badge>
            </section>
        </div>
    );
}
