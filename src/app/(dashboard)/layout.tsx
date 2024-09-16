import { Navbar } from "@/components/custom/bars/Navbar";
import { Sidebar } from "@/components/custom/bars/Sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="w-full h-screen flex">
            <Sidebar />
            <div className="w-full h-full bg-muted/50 flex flex-col">
                <Navbar />
                {children}
            </div>
        </main>
    );
}
