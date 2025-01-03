"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormSchema } from "@/lib/zod/schema";
import { ForgotPasswordFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSendResetPasswordLink } from "@/hooks/auth/useSendResetPasswordLink";
import { Loader } from "lucide-react";

export function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });
    const { email } = form.watch();

    const {
        mutate: mutatesendResetPasswordLink,
        isPending: sendResetPasswordLinkPending,
        isError: sendResetPasswordLinkError,
    } = useSendResetPasswordLink();

    const handleSendResetPasswordLink = (data: ForgotPasswordFormSchemaTypes) => {
        mutatesendResetPasswordLink(data);
        form.reset();
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
                                    disabled={
                                        sendResetPasswordLinkPending && !sendResetPasswordLinkError
                                    }
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={
                        !form.formState.isValid ||
                        !email ||
                        (sendResetPasswordLinkPending && !sendResetPasswordLinkError)
                    }
                    className="w-full"
                >
                    {sendResetPasswordLinkPending && !sendResetPasswordLinkError && (
                        <Loader className="mr-2 size-4 animate-spin" />
                    )}
                    Send reset link
                </Button>
            </form>
        </Form>
    );
}
