"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UpdatePasswordFormSchemaTypes } from "@/types/zod.types";
import { UpdatePasswordFormSchema } from "@/lib/zod/schema";
import { useUpdatePasswordOfUser } from "@/hooks/auth/useUpdatePasswordOfUser";
import { Loader } from "lucide-react";
import { PasswordInput } from "../../inputs/PasswordInput";

export function UpdatePasswordForm() {
    const form = useForm<UpdatePasswordFormSchemaTypes>({
        resolver: zodResolver(UpdatePasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const {
        mutate: mutateUpdatePassword,
        isPending: updatePasswordPending,
        isError: updatePasswordError,
    } = useUpdatePasswordOfUser();

    const { newPassword, confirmNewPassword } = form.watch();

    const isSubmitDisabled =
        !form.formState.isValid ||
        !newPassword ||
        !confirmNewPassword ||
        (updatePasswordPending && !updatePasswordError);

    const handleUpdatePassword = (data: UpdatePasswordFormSchemaTypes) => {
        mutateUpdatePassword(data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="w-full space-y-2">
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
                                    disabled={updatePasswordPending && !updatePasswordError}
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
                                    className="bg-secondary mb-3"
                                    disabled={updatePasswordPending && !updatePasswordError}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="w-full"
                >
                    {updatePasswordPending && !updatePasswordError && (
                        <Loader className="mr-2 size-4 animate-spin" />
                    )}
                    Update Password
                </Button>
            </form>
        </Form>
    );
}
