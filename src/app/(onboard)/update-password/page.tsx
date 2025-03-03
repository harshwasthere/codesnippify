import { Icons } from "@/assets/icons";
import { AuthWrapper } from "@/components/custom/wrappers/AuthWrapper";
import { UpdatePasswordForm } from "@/components/custom/forms/UpdatePasswordForm";

export default function UpdatePasswordPage() {
    return (
        <AuthWrapper
            iconComp={<Icons.LogoCodesnippify className="size-20" />}
            title="Update Password"
            description="Enter your new password to update your password."
        >
            <UpdatePasswordForm />
        </AuthWrapper>
    );
}
