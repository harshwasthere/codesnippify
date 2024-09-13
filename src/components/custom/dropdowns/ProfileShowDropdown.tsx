import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Profile } from "@/types/global.types";
import { LogOut, Settings } from "lucide-react";
import { useLogoutUser } from "@/hooks/auth/useLogoutUser";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileSettingsDialogProps {
    setIsProfileSettingsDialogOpen: (open: boolean) => void;
    profile: Profile | null | undefined;
}

export function ProfileShowDropdown({
    setIsProfileSettingsDialogOpen,
    profile,
}: ProfileSettingsDialogProps) {
    const { mutate: mutateLogoutUser } = useLogoutUser();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="size-8 cursor-pointer flex-shrink-0 rounded-sm border">
                    <AvatarImage
                        src={
                            profile?.avatar_url ??
                            "https://thodtfckfkzsskodxjms.supabase.co/storage/v1/object/public/avatars/default.png?t=2024-09-13T05%3A04%3A35.310Z"
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
                sideOffset={16}
                alignOffset={-4}
                className="flex w-44 flex-col gap-1"
            >
                <div className="flex flex-col items-center rounded-sm bg-secondary p-4 focus:bg-secondary dark:bg-secondary/30 dark:focus:bg-secondary/30 gap-2 ">
                    <div className="relative">
                        <Badge
                            className={cn(
                                "absolute z-50 top-0 right-0 translate-x-1/3 capitalize ",
                                profile?.subscription_status === "pro"
                                    ? " bg-primary/90 hover:bg-primary"
                                    : "bg-green-600 hover:bg-green-700",
                            )}
                        >
                            {profile?.subscription_status ?? "free"}
                        </Badge>
                        <Avatar className="size-20 rounded-full border-2 border-muted">
                            <AvatarImage
                                src={
                                    profile?.avatar_url ??
                                    "https://thodtfckfkzsskodxjms.supabase.co/storage/v1/object/public/avatars/default.png?t=2024-09-13T05%3A04%3A35.310Z"
                                }
                                className="object-cover rounded-sm"
                                alt="profile-picture"
                            />
                            <AvatarFallback className="rounded-sm">
                                {profile?.full_name?.[0] ?? "N"}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <section className="flex w-full flex-col items-center overflow-hidden">
                        {profile?.full_name && (
                            <CardTitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-semibold text-muted-foreground">
                                {profile?.full_name ?? "User name"}
                            </CardTitle>
                        )}

                        {profile?.email && (
                            <CardDescription className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-thin">
                                {profile?.email ?? "mail@gmail.com"}
                            </CardDescription>
                        )}
                    </section>
                </div>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => setIsProfileSettingsDialogOpen(true)}
                        className="group cursor-pointer"
                    >
                        <Settings strokeWidth={1.5} className="mr-2 size-4 group-focus:stroke-2" />
                        <span className="text-xs group-focus:font-medium">Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => mutateLogoutUser()}
                        className="group cursor-pointer text-destructive focus:bg-destructive/20 focus:font-bold focus:text-destructive"
                    >
                        <LogOut strokeWidth={1.5} className="mr-2 size-4 group-focus:stroke-2" />
                        <span className="text-xs group-focus:font-medium">Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
