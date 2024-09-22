"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupFormSchema } from "@/lib/zod/schema";
import { useSignInUserWithOAuth } from "@/hooks/auth/useSignInUserWithOAuth";
import { useSignupUserWithPassword } from "@/hooks/auth/useSignupUserWithPassword";
import { Github, Loader } from "lucide-react";

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

    const { email, password, confirmPassword } = form.watch();

    const {
        mutate: mutateOauthSignup,
        isPending: oauthSignupPending,
        isError: oauthSignupError,
    } = useSignInUserWithOAuth();
    const {
        mutate: mutatePasswordSignup,
        isPending: passwordSignupPending,
        isError: passwordSignupError,
    } = useSignupUserWithPassword();

    const signupPending = oauthSignupPending || passwordSignupPending;
    const signupError = oauthSignupError || passwordSignupError;

    const handlePasswordSignup = (data: SignupFormSchemaTypes) => {
        mutatePasswordSignup(data);
        form.reset();
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
                                        disabled={signupPending && !signupError}
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
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="bg-secondary"
                                        disabled={signupPending && !signupError}
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
                                    <Input
                                        type="password"
                                        placeholder="Confirm password"
                                        className="bg-secondary mb-3"
                                        disabled={signupPending && !signupError}
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
                            !password ||
                            !confirmPassword ||
                            (signupPending && !signupError)
                        }
                        className="w-full"
                    >
                        {passwordSignupError && !signupError && (
                            <Loader className="mr-2 size-4 animate-spin" />
                        )}
                        Signup
                    </Button>
                </form>
            </Form>

            <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t " />
                </div>
                <div className="relative flex justify-center uppercase">
                    <span className=" w-fit   text-muted-foreground">
                        <div className=" w-full px-2 text-xs bg-background">Or continue with</div>
                    </span>
                </div>
            </div>

            <Button
                onClick={() => mutateOauthSignup("github")}
                className="flex items-center w-full bg-foreground hover:bg-foreground/90 text-background"
            >
                {oauthSignupPending && !signupError ? (
                    <Loader className="mr-2 size-4 animate-spin" />
                ) : (
                    <Github className="mr-2 size-4" />
                )}
                Signup with Github
            </Button>
        </section>
    );
}
