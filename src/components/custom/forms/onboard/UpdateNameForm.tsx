"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UpdateNameFormSchemaTypes } from "@/types/zod.types";
import { UpdateNameFormSchema } from "@/lib/zod/schema";

export function UpdateNameForm() {
    const form = useForm<UpdateNameFormSchemaTypes>({
        resolver: zodResolver(UpdateNameFormSchema),
        mode: "onChange",
        defaultValues: {
            newName: "",
        },
    });

    const { newName } = form.watch();

    const onSubmit = (data: UpdateNameFormSchemaTypes) => {
        console.log("UpdateNameForm : ", data);
        form.reset();
    };

    return (
        <Form {...form}>
            <form onSubmit={() => form.handleSubmit(onSubmit)} className="w-full space-y-2">
                <FormField
                    name="newName"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Name"
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
                        Object.keys(form.formState.errors).length > 0 || !newName
                        // || isResetPasswordPending
                    }
                    className="w-full"
                >
                    {/* {isResetPasswordPending && <Loader className="mr-2 size-4 animate-spin" />} */}
                    Update Name
                </Button>
            </form>
        </Form>
    );
}
