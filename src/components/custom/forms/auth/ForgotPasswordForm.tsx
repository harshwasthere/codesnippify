"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormSchema } from "@/lib/zod/schema";
import { ForgotPasswordFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
    const form = useForm<ForgotPasswordFormSchemaTypes>({
        resolver: zodResolver(ForgotPasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
        },
    });

    const { email } = form.watch();

    const onSubmit = (data: ForgotPasswordFormSchemaTypes) => {
        console.log("ForgotPasswordForm : ", data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={() => form.handleSubmit(onSubmit)} className="w-full space-y-2">
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
                                    // disabled={isResetPasswordPending}
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
                        Object.keys(form.formState.errors).length > 0 || !email
                        // || isResetPasswordPending
                    }
                    className="w-full"
                >
                    {/* {isResetPasswordPending && <Loader className="mr-2 size-4 animate-spin" />} */}
                    Send reset link
                </Button>
            </form>
        </Form>
    );
}
