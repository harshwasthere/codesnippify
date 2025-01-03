"use client";
import React from "react";
import { PasswordInput } from "@/components/custom/inputs/PasswordInput";

export default function Testpage() {
    return (
        <main className="min-h-screen h-full w-full flex items-center justify-center p-32">
            <PasswordInput
                type="password"
                placeholder="Enter your password"
                className="bg-secondary"
            />
        </main>
    );
}
