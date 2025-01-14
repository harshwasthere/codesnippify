"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateNameFormSchemaTypes } from "@/types/zod.types";
import { UpdateNameFormSchema } from "@/lib/zod/schema";
import { Loader } from "lucide-react";
import { useUpdateUserProfile } from "@/hooks/user/useUpdateUserProfile";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function UpdateNameForm() {
    const router = useRouter();

    const form = useForm<UpdateNameFormSchemaTypes>({
        resolver: zodResolver(UpdateNameFormSchema),
        mode: "onChange",
        defaultValues: {
            newName: "",
        },
    });

    const {
        mutate: mutateUpdateNameOfUser,
        isPending: updateNamePending,
        isError: updateNameError,
    } = useUpdateUserProfile();

    const { newName } = form.watch();

    const isSubmitDisabled =
        !form.formState.isValid || !newName || (updateNamePending && !updateNameError);

    const onSubmit = ({ newName }: UpdateNameFormSchemaTypes) => {
        mutateUpdateNameOfUser(
            { newName },
            {
                onSuccess: () => {
                    toast.success("Name updated successfully!");
                    router.push("/snippets");
                },
            },
        );
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    name="newName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Name"
                                    className="bg-secondary"
                                    disabled={updateNamePending && !updateNameError}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitDisabled} className="w-full">
                    {updateNamePending && !updateNameError && (
                        <Loader className="mr-2 size-4 animate-spin" />
                    )}
                    Update Name
                </Button>
            </form>
        </Form>
    );
}
