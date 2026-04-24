import { Input } from "@/components/ui/input";
import { PasswordActionRow, PasswordResetFrame } from "@/features/auth/components/PasswordResetFrame";

export function ForgotPasswordEmailView() {
  return (
    <PasswordResetFrame
      step={1}
      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="#050a30" strokeWidth="1.3"/><path d="M2 8l8 5 8-5" stroke="#050a30" strokeWidth="1.3" strokeLinecap="round"/></svg>}
      title="Forgot your password?"
      description="Enter the email associated with your RADIIA account and we&apos;ll send you a reset link."
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#aaa]">Email address</label>
          <Input type="email" placeholder="you@yourcompany.com" className="rounded-md border-[#e0ddd8] h-11" />
        </div>
        <PasswordActionRow primaryLabel="Send reset link" secondaryLabel="Back to sign in" />
      </div>
    </PasswordResetFrame>
  );
}

export function ForgotPasswordCheckEmailView() {
  return (
    <PasswordResetFrame
      step={2}
      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l5 5 8-8" stroke="#2a9d5c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      title="Check your email"
      description={<>We&apos;ve sent a password reset link to <strong className="font-bold text-[#050a30]">you@yourcompany.com</strong>. It will expire in 30 minutes.</>}
    >
      <div className="space-y-4">
        <div className="rounded-md border border-[#e5e2dc] bg-[#fafaf8] px-4 py-4 text-[11px] font-light leading-6 text-[#aaa]">
          Didn&apos;t receive it? Check your spam folder, or <span className="font-bold text-[#233dff]">resend the email</span>.
        </div>
        <PasswordActionRow primaryLabel="I&apos;ve got the link" secondaryLabel="Back to sign in" />
      </div>
    </PasswordResetFrame>
  );
}

export function ResetPasswordView() {
  return (
    <PasswordResetFrame
      step={3}
      icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6.5 8V6.5a3.5 3.5 0 0 1 7 0V8" stroke="#050a30" strokeWidth="1.3" strokeLinecap="round"/><rect x="4" y="8" width="12" height="9" rx="2" stroke="#050a30" strokeWidth="1.3"/></svg>}
      title="Set a new password"
      description="Choose a strong password for your account."
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#aaa]">New password</label>
          <Input type="password" placeholder="••••••••" className="rounded-md border-[#e0ddd8] h-11" />
          <div className="mt-2 text-[10px] font-light text-[#aaa]">Minimum 8 characters</div>
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em] text-[#aaa]">Confirm new password</label>
          <Input type="password" placeholder="••••••••" className="rounded-md border-[#e0ddd8] h-11" />
        </div>
        <PasswordActionRow primaryLabel="Save new password" />
      </div>
    </PasswordResetFrame>
  );
}
