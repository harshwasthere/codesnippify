"use client";

import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/types/common.types";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SettingsDialog } from "../dialogs/SettingsDialog";
import { ThemeToggleButton } from "../buttons/ThemeToggleButton";

interface ProfileShowDropdownProps {
    profile: Profile | null | undefined;
}

export function ProfileShowDropdown({ profile }: ProfileShowDropdownProps) {
    const { mutate: mutateLogout } = useLogout();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="size-8 cursor-pointer flex-shrink-0 rounded-sm border-1 border-muted">
                    <AvatarImage
                        src={
                            profile?.avatar_url ??
                            "https://uraaathoipalxytekytg.supabase.co/storage/v1/object/public/avatars//default.png"
                        }
                        className="object-cover rounded-sm"
                        alt="profile-avatar"
                    />
                    <AvatarFallback className="rounded-sm">
                        {profile?.full_name?.[0] ?? "N"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                side="bottom"
                sideOffset={8}
                className="flex flex-col gap-1 w-[--radix-dropdown-menu-trigger-width] min-w-56"
            >
                <DropdownMenuLabel>
                    <ProfileHeader profile={profile} />
                </DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-semibold">Theme</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <ThemeToggleButton />
                </DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs font-semibold">Settings</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <SettingsDialog profile={profile} />
                    <DropdownMenuItem
                        onClick={() => mutateLogout()}
                        className="group cursor-pointer text-destructive focus:bg-destructive/20 focus:text-destructive"
                    >
                        <LogOut className="mr-2 size-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

interface ProfileHeaderProps {
    profile: Profile | null | undefined;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    return (
        <div className="flex flex-col items-center gap-2 p-4 rounded-md bg-foreground/5 focus:bg-foreground/10">
            <div className="relative">
                <Badge
                    className={cn(
                        "absolute z-50 top-0 right-0 translate-x-1/3 text-xs uppercase",
                        profile?.subscription_status === "pro"
                            ? "bg-primary/90 hover:bg-primary"
                            : "bg-green-600 hover:bg-green-700",
                    )}
                >
                    {profile?.subscription_status ?? "free"}
                </Badge>
                <Avatar className="size-20 rounded-full border-2 border-muted">
                    <AvatarImage
                        src={
                            profile?.avatar_url ??
                            "https://uraaathoipalxytekytg.supabase.co/storage/v1/object/public/avatars//default.png"
                        }
                        className="object-cover rounded-full"
                        alt="profile-picture"
                    />
                    <AvatarFallback className="rounded-full">
                        {profile?.full_name?.[0] ?? "N"}
                    </AvatarFallback>
                </Avatar>
            </div>

            <section className="flex w-full flex-col items-center overflow-hidden">
                {profile?.full_name && (
                    <CardTitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-semibold">
                        {profile?.full_name ?? "User name"}
                    </CardTitle>
                )}

                {profile?.email && (
                    <CardDescription className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs">
                        {profile?.email ?? "mail@gmail.com"}
                    </CardDescription>
                )}
            </section>
        </div>
    );
}
