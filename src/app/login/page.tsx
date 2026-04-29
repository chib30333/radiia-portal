import { Suspense } from "react";

import { AuthFrame } from "@/features/auth/components/AuthFrame";
import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <AuthFrame
      variant="login"
      title="Welcome back"
      description="Sign in to your RADIIA account"
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthFrame>
  );
}
