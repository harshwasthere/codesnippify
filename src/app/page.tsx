import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen h-full w-full flex flex-col gap-4 items-center justify-center p-32">
            <Image src="/logo.png" alt="Codesnippify" width={100} height={100} />
            <Link href="/login" className={cn(buttonVariants({ variant: "default" }))}>
                Codesnippify v2
            </Link>
        </main>
    );
}
