import { Icons } from "@/assets/icons";
import { AuthWrapper } from "@/components/custom/wrappers/AuthWrapper";
import { UpdateNameForm } from "@/components/custom/forms/UpdateNameForm";

export default function UpdateNamePage() {
    return (
        <AuthWrapper
            iconComp={<Icons.LogoCodesnippify className="size-20" />}
            title="Your name?"
            description="What would you like to be called?"
        >
            <UpdateNameForm />
        </AuthWrapper>
    );
}
