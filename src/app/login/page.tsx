import { AuthCard } from "@/features/auth/components/AuthCard";
export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your RADIIA account"
      submitLabel="Sign in"
      variant="login"
    />
  );
}
