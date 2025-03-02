import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
    ResponsiveModal,
    ResponsiveModalBody,
    ResponsiveModalContent,
    ResponsiveModalDescription,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalTrigger,
} from "./responsive-modal";

interface ResponsiveDialogProps {
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode;
}

export function ResponsiveDialog({ title, description, trigger, children }: ResponsiveDialogProps) {
    return (
        <ResponsiveModal>
            <Tooltip>
                <ResponsiveModalTrigger asChild>
                    <TooltipTrigger asChild>{trigger}</TooltipTrigger>
                </ResponsiveModalTrigger>
                <TooltipContent
                    side="right"
                    align="center"
                    className="bg-foreground text-background"
                >
                    Create Folder
                </TooltipContent>
            </Tooltip>
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
