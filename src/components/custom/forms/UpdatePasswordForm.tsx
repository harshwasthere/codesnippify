"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UpdatePasswordFormSchemaTypes } from "@/types/zod.types";
import { UpdatePasswordFormSchema } from "@/lib/schemas";
import { useUpdatePassword } from "@/hooks/auth/useUpdatePassword";
import { Loader } from "lucide-react";
import { PasswordInput } from "@/components/custom/inputs/PasswordInput";

export function UpdatePasswordForm() {
    const form = useForm<UpdatePasswordFormSchemaTypes>({
        resolver: zodResolver(UpdatePasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const { mutate: mutateUpdatePassword, isPending: updatePasswordPending } = useUpdatePassword();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = updatePasswordPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const handleUpdatePassword = async (data: UpdatePasswordFormSchemaTypes) => {
        mutateUpdatePassword(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="w-full space-y-4">
                <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    type="password"
                                    placeholder="Password"
                                    className="bg-secondary"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="confirmNewPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <PasswordInput
                                    type="password"
                                    placeholder="Confirm password"
                                    className="bg-secondary mb-4"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitDisabled} className="w-full">
                    {isLoading && <Loader className="size-4 animate-spin" />}
                    Update Password
                </Button>
            </form>
        </Form>
    );
}
