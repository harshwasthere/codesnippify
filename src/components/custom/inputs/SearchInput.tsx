import * as React from "react";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconClassName?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    ({ className, iconClassName, type, ...props }, ref) => {
        return (
            <div className="relative w-full">
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-10 peer ",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />

                <Search
                    strokeWidth={1.5}
                    className={cn(
                        "absolute -translate-y-1/2 top-1/2 left-3 text-muted-foreground peer-focus-visible:text-primary",
                        iconClassName,
                    )}
                />
            </div>
        );
    },
);
SearchInput.displayName = "SearchInput";
