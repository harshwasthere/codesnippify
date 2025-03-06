"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { SnippetCreateUpdateFormSchemaTypes } from "@/types/zod.types";
import { useState, useEffect } from "react";

interface LanguagePopoverProps {
    disabled: boolean;
    field: FieldValues;
    form: UseFormReturn<SnippetCreateUpdateFormSchemaTypes>;
}

export function LanguagePopover({ disabled, field, form }: LanguagePopoverProps) {
    const [languages, setLanguages] = useState<Array<{ id: string; name: string }>>([]);

    useEffect(() => {
        // Import bundledLanguagesInfo dynamically on the client side
        import("shiki").then(({ bundledLanguagesInfo }) => {
            const langs = bundledLanguagesInfo.map((lang) => ({
                id: lang.id,
                name: lang.name,
            }));
            setLanguages(langs);
        });
    }, []);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "w-48 justify-between bg-foreground/5",
                            !field.value && "text-muted-foreground",
                        )}
                        disabled={disabled}
                    >
                        {field.value
                            ? languages.find((lang) => lang.id === field.value)?.name
                            : "Select language"}
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                            {languages.map((language) => (
                                <CommandItem
                                    value={language.name}
                                    key={language.id}
                                    onSelect={() => {
                                        form.setValue("language", language.id);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 size-4",
                                            language.id === field.value
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {language.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
