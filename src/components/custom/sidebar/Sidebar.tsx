"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/assets/icons";
import { Apple, Atom, FolderPlus, Heart, Icon, SidebarIcon, Trash2Icon } from "lucide-react";
import { SearchInput } from "../inputs/SearchInput";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { dummyFolders } from "@/constants/global.constants";
import { FolderButton } from "../buttons/FolderButton";
import { bundledLanguagesInfo } from "shiki";
import { useDebouncedCallback } from "use-debounce";
import { Folder } from "@/types/global.types";
import { Skeleton } from "@/components/ui/skeleton";
import { pacMan } from "@lucide/lab";

interface Lang {
    id: string;
    name: string;
}

export function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);

    const [folders, setFolders] = React.useState<Folder[]>([]);
    const [languages, setLanguages] = React.useState<Lang[]>([]);
    const [folderSearchTerm, setFolderSearchTerm] = React.useState<string>("");
    const [langSearchTerm, setLangSearchTerm] = React.useState<string>("");
    const handleFolderSearchTermChange = useDebouncedCallback(
        (e) => setFolderSearchTerm(e.target.value),
        400,
    );
    const handleLangSearchTermChange = useDebouncedCallback(
        (e) => setLangSearchTerm(e.target.value),
        400,
    );

    React.useEffect(() => {
        if (!dummyFolders) return;
        const filteredFolders = search(folderSearchTerm, dummyFolders);
        setFolders(filteredFolders);
    }, [dummyFolders, folderSearchTerm]);

    React.useEffect(() => {
        const langs = bundledLanguagesInfo.map((lang) => ({
            id: lang.id,
            name: lang.name,
        }));
        if (!langs) return;
        const filteredLangs = search(langSearchTerm, langs);
        setLanguages(filteredLangs);
    }, [bundledLanguagesInfo, langSearchTerm]);

    const search = <T extends { name: string }>(
        searchTerm: string,
        data: T[] | null | undefined,
    ): T[] => {
        if (!data) return [];
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();

        if (!normalizedSearchTerm) return data;

        const filtered = data.filter((item) =>
            item.name.toLowerCase().includes(normalizedSearchTerm),
        );

        return filtered;
    };

    return (
        <div className="relative h-screen">
            <Button
                variant="secondary"
                size="icon"
                onClick={() => setSidebarOpen((prev) => !prev)}
                className="size-8 absolute top-3 translate-x-full -right-3 z-50"
            >
                <SidebarIcon strokeWidth={1.5} className="size-5" />
            </Button>

            <AnimatePresence>
                <motion.nav
                    variants={{
                        sidebarVariant: {
                            width: sidebarOpen ? "256px" : "0px",
                            visibility: sidebarOpen ? "visible" : "hidden",
                        },
                    }}
                    initial="sidebarVariant"
                    animate="sidebarVariant"
                    exit="sidebarVariant"
                    className="h-full max-w-64 w-full border-r overflow-hidden"
                >
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full flex-shrink-0">
                            <div className="w-full h-14 p-2 border-b flex items-center gap-1">
                                <Icons.LogoCodesnippify className="size-8" />
                                <h1 className="text-2xl font-bricolage font-extrabold">
                                    Codesnippify
                                </h1>
                            </div>
                        </div>
                        <div className="w-full p-2 flex-shrink-0">
                            <Button variant="ghost" size="sm" className="w-full h-8 group gap-2">
                                <Apple
                                    strokeWidth={1.5}
                                    className="size-5 text-primary fill-primary group-hover:stroke-2"
                                />
                                <span className="w-full text-start text-foreground/70 group-hover:text-foreground">
                                    Snippets
                                </span>
                            </Button>
                            <Button variant="ghost" size="sm" className="w-full h-8 group gap-2">
                                <Heart
                                    strokeWidth={1.5}
                                    className="size-5 text-destructive fill-destructive group-hover:stroke-2"
                                />
                                <span className="w-full text-start text-foreground/70 group-hover:text-foreground">
                                    Favorites
                                </span>
                            </Button>
                        </div>
                        <div className="flex-grow flex flex-col min-h-0">
                            <div className="flex flex-col h-1/2 min-h-0">
                                <h3 className="text-xs text-muted-foreground font-manrope font-medium w-full px-2 py-2">
                                    FOLDERS
                                </h3>
                                <div className="w-full flex items-center justify-between gap-2 px-2 py-2">
                                    <SearchInput
                                        type="text"
                                        placeholder="Search folder"
                                        className="h-7 rounded-sm text-xs pl-8 bg-secondary w-full"
                                        iconClassName="size-4"
                                        onChange={handleFolderSearchTermChange}
                                    />
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="p-1 size-7 rounded-sm"
                                    >
                                        <FolderPlus strokeWidth={1.5} className="size-4" />
                                    </Button>
                                </div>
                                <ScrollArea className="flex-grow">
                                    <div className="pl-2 pr-3">
                                        {folders.length === 0 ? (
                                            // <div className="flex flex-col gap-2">
                                            //     {Array.from({ length: 7 }).map((_, index) => (
                                            //         <Skeleton key={index} className="w-full h-7" />
                                            //     ))}
                                            // </div>
                                            <div className="flex flex-col items-center gap-3 mt-10 text-muted-foreground">
                                                <Icon iconNode={pacMan} className="size-6 " />
                                                <span className="font-bricolage text-xs ">
                                                    No folder found
                                                </span>
                                            </div>
                                        ) : (
                                            folders.map((folder: Folder) => (
                                                <FolderButton key={folder.id} folder={folder} />
                                            ))
                                        )}
                                    </div>
                                    <ScrollBar orientation="vertical" />
                                </ScrollArea>
                            </div>
                            <div className="flex flex-col h-1/2 min-h-0">
                                <h3 className="text-xs text-muted-foreground font-manrope font-medium w-full px-2 py-2">
                                    LANGUAGES
                                </h3>
                                <div className="w-full flex items-center justify-between gap-2 px-2 py-2">
                                    <SearchInput
                                        type="text"
                                        placeholder="Search language"
                                        className="h-7 rounded-sm text-xs pl-8 bg-secondary w-full"
                                        iconClassName="size-4"
                                        onChange={handleLangSearchTermChange}
                                    />
                                </div>
                                <ScrollArea className="flex-grow">
                                    <div className="pl-2 pr-3">
                                        {languages.length === 0 ? (
                                            // <div className="flex flex-col gap-2">
                                            //     {Array.from({ length: 7 }).map((_, index) => (
                                            //         <Skeleton key={index} className="w-full h-7" />
                                            //     ))}
                                            // </div>
                                            <div className="flex flex-col items-center gap-3 mt-10 text-muted-foreground">
                                                <Icon iconNode={pacMan} className="size-6 " />
                                                <span className="font-bricolage text-xs ">
                                                    No languages found
                                                </span>
                                            </div>
                                        ) : (
                                            languages.map((language) => (
                                                <Button
                                                    key={language.id}
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full h-8 group gap-2 cursor-pointer"
                                                >
                                                    <Atom
                                                        strokeWidth={1.5}
                                                        className="size-5 text-muted-foreground/50 fill-muted-foreground/10 group-hover:stroke-2"
                                                    />
                                                    <span className="w-full text-start text-foreground/70 group-hover:text-foreground overflow-ellipsis overflow-hidden group-hover:pr-2">
                                                        {language?.name}
                                                    </span>
                                                </Button>
                                            ))
                                        )}
                                    </div>
                                    <ScrollBar orientation="vertical" />
                                </ScrollArea>
                            </div>
                        </div>
                        <div className="w-full p-2 flex-shrink-0">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full h-9 group gap-2 text-destructive bg-destructive/20 hover:bg-destructive/30 rounded"
                            >
                                <Trash2Icon
                                    strokeWidth={1.5}
                                    className="size-5 group-hover:stroke-2"
                                />
                                <span className="w-full text-start">Trash</span>
                            </Button>
                        </div>
                    </div>
                </motion.nav>
            </AnimatePresence>
        </div>
    );
}
