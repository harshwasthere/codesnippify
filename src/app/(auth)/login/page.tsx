import { Icons } from "@/assets/icons";
import { LoginForm } from "@/components/custom/forms/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex items-center justify-center p-4">
            <div className="max-w-96 w-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <Icons.LogoCodesnippify className="size-20" />
                    <h1 className="text-4xl font-bricolage font-extrabold">Codesnippify</h1>
                    <p className="max-w-80 text-lg text-center text-muted-foreground font-manrope">
                        Manage & share your code snippets with ease.
                    </p>
                </div>
                <LoginForm />
                <div className="flex flex-col items-center">
                    <Link href="/signup" className="text-muted-foreground/80">
                        Don’t have an account? Sign up.
                    </Link>
                    <Link href="/forgot-password" className="text-muted-foreground">
                        Forgot Password?
                    </Link>
                </div>
            </div>
        </main>
    );
}
