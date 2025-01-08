"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { MonitorIcon, Moon, Sun } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
                <Sun className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Dark" className="w-full">
                <Moon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="System" className="w-full">
                <MonitorIcon className="h-4 w-4" />
            </ToggleGroupItem>
        </ToggleGroup>
    );
}
