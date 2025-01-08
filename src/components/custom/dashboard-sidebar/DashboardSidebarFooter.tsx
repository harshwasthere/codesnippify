import {
    SidebarFooter,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export function DashboardSidebarFooter() {
    return (
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        asChild
                        tooltip="Trash"
                        className="text-destructive bg-destructive/20 hover:text-destructive hover:bg-destructive/30"
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
