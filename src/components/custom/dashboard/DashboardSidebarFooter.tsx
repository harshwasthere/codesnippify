"use client";

import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebarFooter() {
    const pathname = usePathname();

    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip="Trash"
                        isActive={pathname.includes("/trash")}
                        className="text-destructive bg-destructive/10 hover:text-destructive hover:bg-destructive/20"
                    >
                        <Link href="/trash">
                            <Trash2 className="size-4" />
                            <span>Trash</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    );
}
