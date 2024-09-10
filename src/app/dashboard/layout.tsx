import { Sidebar } from "@/components/custom/bars/Sidebar";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="w-full h-screen flex">
            <Sidebar />
            <div className="w-full h-full">{children}</div>
        </main>
    );
}
