import { Icons } from "@/assets/icons";
import { AuthWrapper } from "@/components/custom/wrappers/AuthWrapper";
import { ForgotPasswordForm } from "@/components/custom/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <AuthWrapper
            iconComp={<Icons.LogoCodesnippify className="size-20" />}
            title="Forgot Password"
            description="Enter your email to receive a link to reset your password."
            primaryLink={{
                text: "Remember Password? Log in.",
                href: "/login",
            }}
        >
            <ForgotPasswordForm />
        </AuthWrapper>
    );
}
