import { AuthFrame } from "@/features/auth/components/AuthFrame";
import { SignupForm } from "@/features/auth/components/SignupForm";

export default function SignupPage() {
  return (
    <AuthFrame
      variant="signup"
      title="Request access"
      description="Submit your details and we'll activate your account"
    >
      <SignupForm />
    </AuthFrame>
  );
}
