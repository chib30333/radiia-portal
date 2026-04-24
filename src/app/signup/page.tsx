import { AuthCard } from "@/features/auth/components/AuthCard";
export default function SignupPage() {
  return (
    <AuthCard
      title="Request access"
      description="Submit your details and we'll activate your account"
      submitLabel="Submit request"
      variant="signup"
    />
  );
}
