import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("animate-pulse rounded-md bg-sidebar-accent", className)} {...props} />
    );
}

export { Skeleton };
