"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/zod/schema";
import { LoginFormSchemaTypes } from "@/types/zod.types";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export function LoginForm() {
    const form = useForm<LoginFormSchemaTypes>({
        resolver: zodResolver(LoginFormSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { email, password } = form.watch();

    const onSubmit = (data: LoginFormSchemaTypes) => {
        console.log("LoginForm : ", data);
        form.reset();
    };

    return (
        <section className="w-full flex flex-col items-center justify-center gap-4">
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
                                        // disabled={isLoginPending}
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
                                        className="bg-secondary mb-3"
                                        // disabled={isLoginPending}
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
                            Object.keys(form.formState.errors).length > 0 || !email || !password
                            // || isLoginPending
                        }
                        className="w-full"
                    >
                        {/* {isLoginPending && <Loader className="mr-2 size-4 animate-spin" />} */}
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

            <Button className="flex items-center w-full">
                <Github className="mr-2 size-4" />
                Login with Github
            </Button>
        </section>
    );
}
