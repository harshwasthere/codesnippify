"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/ui/use-media-query";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
    children: React.ReactNode;
}

interface RootResponsiveModalProps extends BaseProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

interface ResponsiveModalProps extends BaseProps {
    className?: string;
    asChild?: true;
}

const ResponsiveModalContext = React.createContext<{ isDesktop: boolean }>({
    isDesktop: false,
});

const useResponsiveModalContext = () => {
    const context = React.useContext(ResponsiveModalContext);
    if (!context) {
        throw new Error(
            "ResponsiveModal components cannot be rendered outside the ResponsiveModal Context",
        );
    }
    return context;
};

const ResponsiveModal = ({ children, ...props }: RootResponsiveModalProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const ResponsiveModal = isDesktop ? Dialog : Drawer;

    return (
        <ResponsiveModalContext.Provider value={{ isDesktop }}>
            <ResponsiveModal {...props} {...(!isDesktop && { autoFocus: true })}>
                {children}
            </ResponsiveModal>
        </ResponsiveModalContext.Provider>
    );
};

const ResponsiveModalTrigger = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

    return (
        <ResponsiveModalTrigger className={className} {...props}>
            {children}
        </ResponsiveModalTrigger>
    );
};

const ResponsiveModalClose = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalClose = isDesktop ? DialogClose : DrawerClose;

    return (
        <ResponsiveModalClose className={className} {...props}>
            {children}
        </ResponsiveModalClose>
    );
};

const ResponsiveModalContent = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalContent = isDesktop ? DialogContent : DrawerContent;

    return (
        <ResponsiveModalContent className={className} {...props}>
            {children}
        </ResponsiveModalContent>
    );
};

const ResponsiveModalDescription = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalDescription = isDesktop ? DialogDescription : DrawerDescription;

    return (
        <ResponsiveModalDescription className={className} {...props}>
            {children}
        </ResponsiveModalDescription>
    );
};

const ResponsiveModalHeader = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalHeader = isDesktop ? DialogHeader : DrawerHeader;

    return (
        <ResponsiveModalHeader className={className} {...props}>
            {children}
        </ResponsiveModalHeader>
    );
};

const ResponsiveModalTitle = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalTitle = isDesktop ? DialogTitle : DrawerTitle;

    return (
        <ResponsiveModalTitle className={className} {...props}>
            {children}
        </ResponsiveModalTitle>
    );
};

const ResponsiveModalBody = ({ className, children, ...props }: ResponsiveModalProps) => {
    return (
        <div className={cn("px-4 md:px-0", className)} {...props}>
            {children}
        </div>
    );
};

const ResponsiveModalFooter = ({ className, children, ...props }: ResponsiveModalProps) => {
    const { isDesktop } = useResponsiveModalContext();
    const ResponsiveModalFooter = isDesktop ? DialogFooter : DrawerFooter;

    return (
        <ResponsiveModalFooter className={className} {...props}>
            {children}
        </ResponsiveModalFooter>
    );
};

export {
    ResponsiveModal,
    ResponsiveModalTrigger,
    ResponsiveModalClose,
    ResponsiveModalContent,
    ResponsiveModalDescription,
    ResponsiveModalHeader,
    ResponsiveModalTitle,
    ResponsiveModalBody,
    ResponsiveModalFooter,
};
