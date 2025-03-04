"use client";

import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    useSidebar,
} from "@/components/ui/sidebar";
import { Apple, Atom, CircleAlertIcon, FolderIcon, Heart } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "../inputs/SearchInput";
import { useFetchFolders } from "@/hooks/folder/useFetchFolders";
import { useFetchLangsWithSnippetCount } from "@/hooks/snippet/useFetchLangsWithSnippetCount";
import React from "react";
import { Folder, Language } from "@/types/common.types";
import { useDebouncedCallback } from "use-debounce";
import { cn, search } from "@/lib/utils";
import { SidebarFolderButtonDropdown } from "../dropdowns/SidebarFolderButtonDropdown";
import { usePathname } from "next/navigation";
import { FolderCreateDialog } from "../dialogs/FolderCreateDialog";

export function DashboardSidebarContent() {
    const pathname = usePathname();
    const { isMobile } = useSidebar();

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
        <SidebarContent className="gap-0">
            <SidebarGroup>
                <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Snippets"
                                isActive={pathname.includes("/snippets")}
                            >
                                <Link href="/snippets">
                                    <Apple className="size-4 text-primary fill-primary" />
                                    <span>Snippets</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                tooltip="Favorites"
                                isActive={pathname.includes("/favorites")}
                            >
                                <Link href="/favorites">
                                    <Heart className="size-4 text-red-500 fill-red-500" />
                                    <span>Favorites</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
            <div className="w-full flex flex-col flex-grow min-h-0">
                <SidebarGroup className="h-1/2">
                    <SidebarGroupLabel>Folders</SidebarGroupLabel>
                    <FolderCreateDialog />
                    <div className="w-full py-2">
                        <SearchInput
                            type="text"
                            placeholder="Search folder"
                            className="h-7 text-xs bg-sidebar-accent"
                            iconClassName="size-4"
                            onChange={handleFolderSearchTermChange}
                        />
                    </div>
                    <SidebarGroupContent className="overflow-auto">
                        <SidebarMenu>
                            {fetchedFoldersLoading && !fetchedFoldersSuccess ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuSkeleton />
                                    </SidebarMenuItem>
                                ))
                            ) : folders.length === 0 ? (
                                <SidebarMenuItem className="flex flex-col items-center justify-center mt-10 text-muted-foreground/50 text-center">
                                    <CircleAlertIcon className="size-6" />
                                    <span className="text-xs mt-1">No folder found</span>
                                    <span className="text-xs w-2/3 text-center">
                                        Create a folder to get started
                                    </span>
                                </SidebarMenuItem>
                            ) : (
                                folders.map((folder: Folder) => (
                                    <SidebarMenuItem key={folder.id}>
                                        <SidebarMenuButton
                                            asChild
                                            className="group/folder-button relative [&:has([data-state=open])]:bg-sidebar-accent"
                                            isActive={pathname.includes(`/folder/${folder.id}`)}
                                        >
                                            <Link href={`/folder/${folder.id}`}>
                                                <FolderIcon className="size-4 fill-muted-foreground text-muted-foreground" />
                                                <span className="truncate first-letter:capitalize group-hover/folder-button:pr-7">
                                                    {folder?.name}
                                                </span>
                                                <div
                                                    className={cn(
                                                        "ml-auto absolute top-1/2 -translate-y-1/2 right-2 opacity-0 group-hover/folder-button:opacity-100 flex items-center justify-center gap-1 [&[data-state=open]]:opacity-100 [&:has(>div[data-state=open])]:opacity-100",
                                                        isMobile && "opacity-100",
                                                    )}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <SidebarFolderButtonDropdown
                                                        currentFolder={folder}
                                                    />
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="h-1/2">
                    <SidebarGroupLabel>Languages</SidebarGroupLabel>
                    <div className="w-full py-2">
                        <SearchInput
                            type="text"
                            placeholder="Search language"
                            className="h-7 text-xs bg-sidebar-accent"
                            iconClassName="size-4"
                            onChange={handleLangSearchTermChange}
                        />
                    </div>
                    <SidebarGroupContent className="overflow-auto">
                        <SidebarMenu>
                            {fetchedLanguagesLoading && !fetchedLanguagesSuccess ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <SidebarMenuItem key={index}>
                                        <SidebarMenuSkeleton />
                                    </SidebarMenuItem>
                                ))
                            ) : languages.length === 0 ? (
                                <SidebarMenuItem className="flex flex-col items-center justify-center gap-1 mt-10 text-muted-foreground/50">
                                    <CircleAlertIcon className="size-6" />
                                    <span className="text-xs w-2/3 text-center">
                                        No snippets found for available languages
                                    </span>
                                </SidebarMenuItem>
                            ) : (
                                languages.map((language: Language) => (
                                    <SidebarMenuItem key={language.language}>
                                        <SidebarMenuButton
                                            asChild
                                            className="group/language-button relative"
                                            isActive={pathname.includes(
                                                `/language/${language.language}`,
                                            )}
                                        >
                                            <Link href={`/language/${language.language}`}>
                                                <Atom className="size-4 fill-muted-foreground/10 text-muted-foreground" />
                                                <span className="truncate first-letter:capitalize group-hover/language-button:pr-7">
                                                    {language.language}
                                                </span>
                                                <div className="ml-auto absolute top-1/2 -translate-y-1/2 right-2 text-primary text-xs bg-primary/20 group-hover/language-button:bg-primary/30 p-1 px-2 h-5 min-w-5 rounded-full flex items-center justify-center flex-shrink-0">
                                                    {language?.snippet_count}
                                                </div>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </div>
        </SidebarContent>
    );
}
