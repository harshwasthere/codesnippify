import { Icons } from "@/assets/icons";
import { UpdateNameForm } from "@/components/custom/forms/onboard/UpdateNameForm";

export default function LoginPage() {
    return (
        <main className="w-full h-screen flex items-center justify-center p-4">
            <div className="max-w-96 w-full flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center gap-2">
                    <Icons.LogoCodesnippify className="size-20" />
                    <h1 className="text-4xl font-bricolage font-extrabold">Your name?</h1>
                    <p className="max-w-80 text-lg text-center text-muted-foreground font-manrope">
                        What would you like to be called?
                    </p>
                </div>
                <UpdateNameForm />
            </div>
        </main>
    );
}
