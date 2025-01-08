import { DashboardNavbar } from "@/components/custom/dashboard-navbar/DashboardNavbar";
import { DashboardSidebar } from "@/components/custom/dashboard-sidebar/DashboardSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <DashboardNavbar />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
