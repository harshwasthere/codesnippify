import { Icons } from "@/assets/icons";
import { SignupForm } from "@/components/custom/forms/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
    return (
        <main className="w-full h-screen flex items-center justify-center p-4">
            <div className="max-w-96 w-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <Icons.LogoCodesnippify className="size-20" />
                    <h1 className="text-4xl font-bricolage font-extrabold">Welcome!</h1>
                    <p className="max-w-80 text-lg text-center text-muted-foreground font-manrope">
                        Codesnippify with ease, Fill in the form below to sign up.
                    </p>
                </div>
                <SignupForm />
                <div className="flex flex-col items-center">
                    <Link
                        href="/login"
                        className="text-muted-foreground/80 hover:underline hover:text-muted-foreground"
                    >
                        Already have an account? Log in.
                    </Link>
                </div>
            </div>
        </main>
    );
}
