import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    ResponsiveModal,
    ResponsiveModalBody,
    ResponsiveModalClose,
    ResponsiveModalContent,
    ResponsiveModalDescription,
    ResponsiveModalFooter,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from "./responsive-modal";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
    tooltip?: string;
    tooltipClassName?: string;
    tooltipSide?: "top" | "right" | "bottom" | "left";
    tooltipAlign?: "start" | "center" | "end";
}

export function ResponsiveDialog({
    open,
    onOpenChange,
    title,
    description,
    trigger,
    children,
    tooltip,
    tooltipClassName,
    tooltipSide = "right",
    tooltipAlign = "center",
}: ResponsiveDialogProps) {
    return (
        <ResponsiveModal open={open} onOpenChange={onOpenChange}>
            {tooltip ? (
                <Tooltip>
                    <ResponsiveModalTrigger asChild>
                        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                    </ResponsiveModalTrigger>
                    <TooltipContent
                        side={tooltipSide}
                        align={tooltipAlign}
                        className={cn("bg-foreground text-background", tooltipClassName)}
                    >
                        {tooltip}
                    </TooltipContent>
                </Tooltip>
            ) : (
                <ResponsiveModalTrigger asChild>{trigger}</ResponsiveModalTrigger>
            )}
            <ResponsiveModalContent>
                <ResponsiveModalHeader>
                    <ResponsiveModalTitle>{title}</ResponsiveModalTitle>
                    <ResponsiveModalDescription>{description}</ResponsiveModalDescription>
                </ResponsiveModalHeader>
                <ResponsiveModalBody>{children}</ResponsiveModalBody>
            </ResponsiveModalContent>
        </ResponsiveModal>
    );
}

export const ResponsiveDialogFooter = ResponsiveModalFooter;
export const ResponsiveDialogClose = ResponsiveModalClose;
