import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen h-full w-full flex items-center justify-center p-32">
            <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
                Codesnippify v2
            </Link>
        </main>
    );
}
