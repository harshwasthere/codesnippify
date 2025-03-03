import { Icons } from "@/assets/icons";
import { AuthWrapper } from "@/components/custom/wrappers/AuthWrapper";
import { LoginForm } from "@/components/custom/forms/LoginForm";

export default function LoginPage() {
    return (
        <AuthWrapper
            iconComp={<Icons.LogoCodesnippify className="size-20" />}
            title="Codesnippify"
            description="Manage & share your code snippets with ease."
            primaryLink={{
                text: "Don’t have an account? Sign up.",
                href: "/signup",
            }}
            secondaryLink={{
                text: "Forgot your password?",
                href: "/forgot-password",
            }}
        >
            <LoginForm />
        </AuthWrapper>
    );
}
