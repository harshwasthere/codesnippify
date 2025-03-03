import { Icons } from "@/assets/icons";
import { AuthWrapper } from "@/components/custom/wrappers/AuthWrapper";
import { SignupForm } from "@/components/custom/forms/SignupForm";

export default function SignupPage() {
    return (
        <AuthWrapper
            iconComp={<Icons.LogoCodesnippify className="size-20" />}
            title="Welcome!"
            description="Codesnippify with ease, Fill in the form below to sign up."
            primaryLink={{
                text: "Already have an account? Log in.",
                href: "/login",
            }}
        >
            <SignupForm />
        </AuthWrapper>
    );
}
