"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupFormSchema } from "@/lib/schemas";
import { useOAuth } from "@/hooks/auth/useOAuth";
import { useSignup } from "@/hooks/auth/useSignup";
import { Github, Loader } from "lucide-react";
import { PasswordInput } from "@/components/custom/inputs/PasswordInput";

export function SignupForm() {
    const form = useForm<SignupFormSchemaTypes>({
        resolver: zodResolver(SignupFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const {
        mutate: mutateOauthSignup,
        isPending: oauthSignupPending,
        error: oauthSignupError,
    } = useOAuth();
    const {
        mutate: mutatePasswordSignup,
        isPending: passwordSignupPending,
        error: passwordSignupError,
    } = useSignup();

    const { isSubmitting, isValid } = form.formState;
    const isLoading = oauthSignupPending || passwordSignupPending || isSubmitting;
    const isSubmitDisabled = !isValid || isLoading;

    const handlePasswordSignup = async (data: SignupFormSchemaTypes) => {
        mutatePasswordSignup(data, {
            onSuccess: () => {
                form.reset();
            },
        });
    };

    return (
        <section className="w-full flex flex-col items-center justify-center gap-4">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handlePasswordSignup)}
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
                    <FormField
                        name="password"
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
                        name="confirmPassword"
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
                        {passwordSignupPending && !passwordSignupError && (
                            <Loader className="size-4 animate-spin" />
                        )}
                        Signup
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
                onClick={() => mutateOauthSignup("github")}
                disabled={isLoading}
                className="flex items-center w-full bg-foreground hover:bg-foreground/90 text-background"
            >
                {oauthSignupPending && !oauthSignupError ? (
                    <Loader className="size-4 animate-spin" />
                ) : (
                    <Github className="size-4" />
                )}
                Signup with Github
            </Button>
        </section>
    );
}
