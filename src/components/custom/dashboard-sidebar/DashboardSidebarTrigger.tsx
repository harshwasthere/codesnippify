"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Sidebar } from "lucide-react";

export function DashboardSidebarTrigger() {
    const { toggleSidebar } = useSidebar();

    return (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="size-8">
            <Sidebar className="size-6" />
        </Button>
    );
}
