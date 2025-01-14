import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Icons } from "@/assets/icons";
import Link from "next/link";

export function DashboardSidebarHeader() {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild>
                        <Link href="/" className="flex items-center gap-2 h-14">
                            <Icons.LogoCodesnippify className="!size-12" />
                            <div className="flex flex-col">
                                <span className="font-poppins font-bold text-lg leading-tight">
                                    Codesnippify
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    Code snippet management tool
                                </span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    );
}
