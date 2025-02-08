"use client";

import { DashboardNavbar } from "@/components/custom/dashboard-navbar/DashboardNavbar";
import { DashboardSidebar } from "@/components/custom/dashboard-sidebar/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset className="h-[calc(100svh-theme(spacing.4))] overflow-hidden">
                <DashboardNavbar />
                <div className="w-full h-full flex flex-1 flex-col overflow-auto ">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
