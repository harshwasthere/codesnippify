"use client";

import { Loader, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/custom/inputs/PasswordInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/auth/useLogin";
import { useOAuth } from "@/hooks/auth/useOAuth";
import { LoginFormSchemaTypes } from "@/types/zod.types";
import { LoginFormSchema } from "@/lib/schemas";

export function LoginForm() {
    const form = useForm<LoginFormSchemaTypes>({
        resolver: zodResolver(LoginFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate: mutateOauthLogin, isPending: oauthLoginPending } = useOAuth();
    const { mutate: mutatePasswordLogin, isPending: passwordLoginPending } = useLogin();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = oauthLoginPending || passwordLoginPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const handlePasswordLogin = async (data: LoginFormSchemaTypes) => {
        mutatePasswordLogin(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <section className="w-full flex flex-col items-center justify-center gap-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handlePasswordLogin)}
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
                                        autoComplete="email"
                                        disabled={isLoading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <PasswordInput
                                        type="password"
                                        placeholder="Password"
                                        className="bg-secondary mb-4"
                                        autoComplete="current-password"
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
                        Login
                    </Button>
                </form>
            </Form>

            <div className="relative my-2 flex items-center w-full">
                <div className="flex-grow border-t"></div>
                <span className="mx-2 text-xs text-muted-foreground uppercase">
                    Or continue with
                </span>
                <div className="flex-grow border-t"></div>
            </div>

            <Button
                onClick={() => mutateOauthLogin("github")}
                disabled={isLoading}
                className="flex items-center w-full bg-foreground hover:bg-foreground/90 text-background"
            >
                {isLoading ? (
                    <Loader className="size-4 animate-spin" />
                ) : (
                    <Github className="size-4" />
                )}
                Login with Github
            </Button>
        </section>
    );
}
