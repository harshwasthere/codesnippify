import { Icons } from "@/assets/icons";
import { ForgotPasswordForm } from "@/components/custom/forms/auth/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <main className="w-full h-screen flex items-center justify-center p-4">
            <div className="max-w-96 w-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <Icons.LogoCodesnippify className="size-20" />
                    <h1 className="text-4xl font-poppins font-extrabold">Forgot Password?</h1>
                </div>
                <ForgotPasswordForm />
                <div className="flex flex-col items-center">
                    <Link
                        href="/login"
                        className="text-muted-foreground/80 hover:underline hover:text-muted-foreground"
                    >
                        Remember Password? Log in.
                    </Link>
                </div>
            </div>
        </main>
    );
}
