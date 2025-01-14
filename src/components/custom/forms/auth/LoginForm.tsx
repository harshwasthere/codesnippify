"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/zod/schema";
import { LoginFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLoginUser } from "@/hooks/auth/useLoginUser";
import { useSignInUserWithOAuth } from "@/hooks/auth/useSignInUserWithOAuth";
import { Loader, Github } from "lucide-react";
import { PasswordInput } from "../../inputs/PasswordInput";

export function LoginForm() {
    const form = useForm<LoginFormSchemaTypes>({
        resolver: zodResolver(LoginFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        mutate: mutateOauthLogin,
        isPending: oauthLoginPending,
        isError: oauthLoginError,
    } = useSignInUserWithOAuth();
    const {
        mutate: mutatePasswordLogin,
        isPending: passwordLoginPending,
        isError: passwordLoginError,
    } = useLoginUser();

    const { email, password } = form.watch();

    const loginPending = oauthLoginPending || passwordLoginPending;
    const loginError = oauthLoginError || passwordLoginError;

    const isSubmitDisabled =
        !form.formState.isValid || !email || !password || (loginPending && !loginError);

    const handlePasswordLogin = async (data: LoginFormSchemaTypes) => {
        mutatePasswordLogin(data);
        form.reset();
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
                                        disabled={loginPending && !loginError}
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
                                        className="bg-secondary mb-3"
                                        autoComplete="current-password"
                                        disabled={loginPending && !loginError}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitDisabled} className="w-full">
                        {passwordLoginPending && !loginError && (
                            <Loader className="size-4 animate-spin" />
                        )}
                        Login
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
                onClick={() => mutateOauthLogin("github")}
                className="flex items-center w-full bg-foreground hover:bg-foreground/90 text-background"
            >
                {oauthLoginPending && !oauthLoginError ? (
                    <Loader className="size-4 animate-spin" />
                ) : (
                    <Github className="size-4" />
                )}
                Login with Github
            </Button>
        </section>
    );
}
