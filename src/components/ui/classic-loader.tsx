import { cn } from "@/lib/utils";

export default function ClassicLoader({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "h-10 w-10 animate-spin rounded-full border-4 border-gray-muted border-t-muted-foreground",
                className,
            )}
        />
    );
}
