"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormSchema } from "@/lib/schemas";
import { ForgotPasswordFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

export function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const { mutate: mutateResetPassword, isPending: resetPasswordPending } = useResetPassword();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = resetPasswordPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const handleSendResetPasswordLink = (data: ForgotPasswordFormSchemaTypes) => {
        mutateResetPassword(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSendResetPasswordLink)}
                className="w-full space-y-4"
            >
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    className="bg-secondary"
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
                    Send reset link
                </Button>
            </form>
        </Form>
    );
}
