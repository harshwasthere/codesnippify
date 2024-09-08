"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdatePasswordFormSchemaTypes } from "@/types/zod.types";
import { UpdatePasswordFormSchema } from "@/lib/zod/schema";

export function UpdatePasswordForm() {
    const form = useForm<UpdatePasswordFormSchemaTypes>({
        resolver: zodResolver(UpdatePasswordFormSchema),
        mode: "onChange",
        defaultValues: {
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const { newPassword, confirmNewPassword } = form.watch();

    const onSubmit = (data: UpdatePasswordFormSchemaTypes) => {
        console.log("UpdatePasswordForm : ", data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={() => form.handleSubmit(onSubmit)} className="w-full space-y-2">
                <FormField
                    name="newPassword"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    className="bg-secondary mb-3"
                                    // disabled={isUpdatePasswordPending}
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
                                <Input
                                    type="password"
                                    placeholder="Confirm password"
                                    className="bg-secondary mb-3"
                                    // disabled={isUpdatePasswordPending}
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
                        Object.keys(form.formState.errors).length > 0 ||
                        !newPassword ||
                        !confirmNewPassword
                        // || isUpdatePasswordPending
                    }
                    className="w-full"
                >
                    {/* {isUpdatePasswordPending && <Loader className="mr-2 size-4 animate-spin" />} */}
                    Update Password
                </Button>
            </form>
        </Form>
    );
}
