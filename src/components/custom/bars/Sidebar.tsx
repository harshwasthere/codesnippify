"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icons } from "@/assets/icons";
import { Apple, Atom, Heart, Icon, SidebarIcon, Trash2Icon } from "lucide-react";
import { SearchInput } from "../inputs/SearchInput";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FolderButton } from "../buttons/FolderButton";
import { useDebouncedCallback } from "use-debounce";
import { pacMan } from "@lucide/lab";
import { useRouter } from "next/navigation";
import { CreateFolderDialog } from "../dialogs/CreateFolderDialog";
import { useFetchFolders } from "@/hooks/folder/useFetchFolders";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchLangsWithSnippetCount } from "@/hooks/snippet/useFetchLangsWithSnippetCount";
import { langsEnum } from "@/constants/global.constants";
import { useGlobalStore } from "@/providers/GlobalStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Folder, Language } from "@/types/global.types";
import { search } from "@/lib/utils";

export function Sidebar() {
    const { isSidebarOpen, toggleSidebar, sidebarType, setSidebarType } = useGlobalStore(
        useShallow((store) => ({
            isSidebarOpen: store.isSidebarOpen,
            toggleSidebar: store.toggleSidebar,
            sidebarType: store.sidebarType,
            setSidebarType: store.setSidebarType,
        })),
    );

    React.useEffect(() => {
        const handleSidebarTypeChange = () => {
            if (window.innerWidth < 1000) {
                setSidebarType("sheet");
            } else {
                setSidebarType("side");
            }
        };
        window.addEventListener("resize", handleSidebarTypeChange);

        return () => window.removeEventListener("resize", handleSidebarTypeChange);
    }, [setSidebarType]);

    return sidebarType === "sheet" ? (
        <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
            <SheetContent side="left" className="sm:max-w-[304px] w-[304px]">
                <SidebarContent />
            </SheetContent>
        </Sheet>
    ) : (
        <div className="relative h-screen">
            <AnimatePresence>
                <motion.nav
                    variants={{
                        sidebarVariant: {
                            width: isSidebarOpen ? "256px" : "0px",
                            visibility: isSidebarOpen ? "visible" : "hidden",
                        },
                    }}
                    initial="sidebarVariant"
                    animate="sidebarVariant"
                    exit="sidebarVariant"
                    className="h-full max-w-64 w-full border-r overflow-hidden"
                >
                    <SidebarContent />
                </motion.nav>
            </AnimatePresence>
        </div>
    );
}

/**
 *  Main content of the sidebar
 */

function SidebarContent() {
    const router = useRouter();
    const {
        data: fetchedFolders,
        isLoading: fetchedFoldersLoading,
        isSuccess: fetchedFoldersSuccess,
    } = useFetchFolders();
    const {
        data: fetchedLanguages,
        isLoading: fetchedLanguagesLoading,
        isSuccess: fetchedLanguagesSuccess,
    } = useFetchLangsWithSnippetCount();

    const [folders, setFolders] = React.useState<Folder[]>([]);
    const [languages, setLanguages] = React.useState<Language[]>([]);

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
        if (!fetchedFolders) return;
        const filteredFolders = search(folderSearchTerm, fetchedFolders, "name");
        setFolders(filteredFolders);
    }, [fetchedFolders, folderSearchTerm]);

    React.useEffect(() => {
        if (!fetchedLanguages) return;
        const filteredLanguages = search(langSearchTerm, fetchedLanguages, "language");
        setLanguages(filteredLanguages);
    }, [fetchedLanguages, langSearchTerm]);

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex-shrink-0 h-14 p-2 border-b flex items-center gap-1">
                <Icons.LogoCodesnippify className="size-8" />
                <h1 className="text-2xl font-bricolage font-extrabold">Codesnippify</h1>
            </div>
            <div className="w-full p-2 flex-shrink-0">
                <Button
                    onClick={() => router.push("/snippets")}
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 group gap-2"
                >
                    <Apple
                        strokeWidth={1.5}
                        className="size-5 text-primary fill-primary group-hover:stroke-2"
                    />
                    <span className="w-full text-start text-foreground/70 group-hover:text-foreground">
                        Snippets
                    </span>
                </Button>
                <Button
                    onClick={() => router.push("/favorites")}
                    variant="ghost"
                    size="sm"
                    className="w-full h-8 group gap-2"
                >
                    <Heart
                        strokeWidth={1.5}
                        className="size-5 text-destructive fill-destructive group-hover:stroke-2"
                    />
                    <span className="w-full text-start text-foreground/70 group-hover:text-foreground">
                        Favorites
                    </span>
                </Button>
            </div>
            <div className="w-full flex-grow flex flex-col min-h-0">
                <div className="w-full h-1/2 min-h-0 flex flex-col">
                    <h3 className="w-full text-xs text-muted-foreground font-manrope font-medium  px-2 py-2">
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
                        <CreateFolderDialog />
                    </div>
                    <ScrollArea className="w-full h-full flex-grow min-h-0">
                        <div className="w-full pl-2 pr-3">
                            {fetchedFoldersLoading && !fetchedFoldersSuccess ? (
                                <div className="w-full flex flex-col gap-2">
                                    {Array.from({ length: 7 }).map((_, index) => (
                                        <Skeleton key={index} className="w-full h-7" />
                                    ))}
                                </div>
                            ) : folders.length === 0 ? (
                                <div className="w-full flex flex-col items-center gap-3 mt-10 text-muted-foreground/50">
                                    <Icon iconNode={pacMan} className="size-6 " />
                                    <span className="font-bricolage text-xs ">No folder found</span>
                                </div>
                            ) : (
                                folders.map((folder: Folder) => (
                                    <FolderButton
                                        key={folder.id}
                                        folder={folder}
                                        onClick={() => router.push(`/folder/${folder.id}`)}
                                    />
                                ))
                            )}
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                </div>
                <div className="w-full h-1/2 min-h-0 flex flex-col ">
                    <h3 className="w-full text-xs text-muted-foreground font-manrope font-medium px-2 py-2">
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
                    <ScrollArea className="w-full flex-grow min-h-0">
                        <div className="w-full pl-2 pr-3">
                            {fetchedLanguagesLoading && !fetchedLanguagesSuccess ? (
                                <div className="w-full flex flex-col gap-2">
                                    {Array.from({ length: 7 }).map((_, index) => (
                                        <Skeleton key={index} className="w-full h-7" />
                                    ))}
                                </div>
                            ) : languages.length === 0 ? (
                                <div className="w-full flex flex-col items-center gap-3 mt-10 text-muted-foreground/50">
                                    <Icon iconNode={pacMan} className="size-6 " />
                                    <span className="font-bricolage text-xs ">
                                        No languages found
                                    </span>
                                </div>
                            ) : (
                                languages.map((language: Language) => (
                                    <Button
                                        onClick={() =>
                                            router.push(`/language/${language.language}`)
                                        }
                                        key={language.language}
                                        variant="ghost"
                                        size="sm"
                                        className="w-full h-8 group gap-2 cursor-pointer max-w-[235px]"
                                    >
                                        <Atom
                                            strokeWidth={1.5}
                                            className="size-4 text-muted-foreground/50 fill-muted-foreground/10 group-hover:stroke-2 flex-shrink-0"
                                        />
                                        <span className="w-full text-start text-foreground/70 group-hover:text-foreground truncate">
                                            {language.language && langsEnum[language.language]}
                                        </span>
                                        <span className="text-primary text-xs bg-primary/20 group-hover:bg-primary/30 p-1 h-5 min-w-5 rounded-full flex items-center justify-center flex-shrink-0">
                                            {language?.snippet_count}
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
                    onClick={() => router.push("/trash")}
                    variant="secondary"
                    size="sm"
                    className="w-full h-9 group gap-2 text-destructive bg-destructive/20 hover:bg-destructive/30 rounded"
                >
                    <Trash2Icon strokeWidth={1.5} className="size-5 group-hover:stroke-2" />
                    <span className="w-full text-start">Trash</span>
                </Button>
            </div>
        </div>
    );
}
