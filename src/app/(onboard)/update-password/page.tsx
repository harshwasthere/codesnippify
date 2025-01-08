import { Icons } from "@/assets/icons";
import { UpdatePasswordForm } from "@/components/custom/forms/onboard/UpdatePasswordForm";

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex items-center justify-center p-4">
            <div className="max-w-96 w-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <Icons.LogoCodesnippify className="size-20" />
                    <h1 className="text-4xl font-extrabold">Update Password</h1>
                    <p className="max-w-80 text-lg text-center text-muted-foreground ">
                        Enter the new password below.
                    </p>
                </div>
                <UpdatePasswordForm />
            </div>
        </main>
    );
}
