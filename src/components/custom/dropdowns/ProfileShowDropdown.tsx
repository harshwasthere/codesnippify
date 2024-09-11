import { CalendarDays, LogOut, Settings, SidebarIcon } from "lucide-react";
import Image from "next/image";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useLogoutUser } from "@/hooks/auth/useLogoutUser";

interface ProfileSettingsDialogProps {
    setIsProfileSettingsDialogOpen: (open: boolean) => void;
}

export function ProfileShowDropdown({
    setIsProfileSettingsDialogOpen,
}: ProfileSettingsDialogProps) {
    const { mutate: mutateLogoutUser } = useLogoutUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="size-8 cursor-pointer flex-shrink-0 rounded-sm border">
                    <AvatarImage
                        src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1"
                        className="object-cover rounded-sm"
                        alt="profile-avatar"
                    />
                    <AvatarFallback className="rounded-sm">AG</AvatarFallback>
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
                        <Badge className="bg-green-600 hover:bg-green-700 absolute z-50 top-0 right-0 translate-x-1/3">
                            Free
                        </Badge>
                        <Avatar className="size-20 rounded-full border-2 border-muted">
                            <AvatarImage
                                src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1"
                                className="object-cover rounded-sm"
                                alt="profile-picture"
                            />
                            <AvatarFallback className="rounded-sm">AG</AvatarFallback>
                        </Avatar>
                    </div>

                    <section className="flex w-full flex-col items-center overflow-hidden">
                        <CardTitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm font-semibold text-muted-foreground">
                            Ryan Garcia
                        </CardTitle>
                        <CardDescription className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs font-thin">
                            ryangarcia@gmail.com
                        </CardDescription>
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
