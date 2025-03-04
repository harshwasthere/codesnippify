"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ThemeToggleButtonProps {
    className?: string;
}

export function ThemeToggleButton({ className }: ThemeToggleButtonProps) {
    const { setTheme, theme } = useTheme();

    return (
        <ToggleGroup
            type="single"
            className={className}
            value={theme}
            onValueChange={(value) => {
                if (value) setTheme(value);
            }}
        >
            <ToggleGroupItem value="light" aria-label="Light" className="w-full">
                <SunIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark" className="w-full">
                <MoonIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="System" className="w-full">
                <MonitorIcon className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}

export function ThemeToggleDropdown({ className }: ThemeToggleButtonProps) {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={cn("size-8 flex-shrink-0", className)}
                >
                    <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-20">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
