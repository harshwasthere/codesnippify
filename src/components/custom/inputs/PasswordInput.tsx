import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    iconClassName?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, iconClassName, type, placeholder, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);

        const handleClick = () => setShowPassword(!showPassword);

        return (
            <div className="relative w-full">
                <input
                    type={showPassword ? "text" : type ? type : "password"}
                    placeholder={placeholder}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10 peer",
                        className,
                    )}
                    ref={ref}
                    {...props}
                />
                {showPassword ? (
                    <EyeOff
                        className={cn(
                            "absolute -translate-y-1/2 top-1/2 right-3 text-muted-foreground peer-focus-visible:text-primary size-4",
                            iconClassName,
                        )}
                        onClick={handleClick}
                    />
                ) : (
                    <Eye
                        className={cn(
                            "absolute -translate-y-1/2 top-1/2 right-3 text-muted-foreground peer-focus-visible:text-primary size-4",
                            iconClassName,
                        )}
                        onClick={handleClick}
                    />
                )}
            </div>
        );
    },
);
PasswordInput.displayName = "PasswordInput";
