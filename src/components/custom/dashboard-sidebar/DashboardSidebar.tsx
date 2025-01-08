"use client";

import { Sidebar, SidebarRail } from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "./DashboardSidebarHeader";
import { DashboardSidebarContent } from "./DashboardSidebarContent";
import { DashboardSidebarFooter } from "./DashboardSidebarFooter";

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props} variant="inset">
            <DashboardSidebarHeader />
            <DashboardSidebarContent />
            <DashboardSidebarFooter />
            <SidebarRail />
        </Sidebar>
    );
}
