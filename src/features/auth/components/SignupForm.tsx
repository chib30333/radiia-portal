import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AuthFieldLabel({
  children,
  optional
}: {
  children: ReactNode;
  optional?: ReactNode;
}) {
  return (
    <label className="mb-[7px] block text-[10px] font-bold uppercase tracking-[0.1em]">
      {children}
      {optional ? (
        <span className="ml-1 normal-case tracking-normal text-[10px] font-light text-[#aaa]">
          {optional}
        </span>
      ) : null}
    </label>
  );
}

function AuthSectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-[10px]">
      <div className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em]">
        {label}
      </div>
      <div className="h-px flex-1 bg-[#f0ede7]" />
    </div>
  );
}

export function SignupForm() {
  return (
    <>
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <AuthFieldLabel>First name</AuthFieldLabel>
          <Input
            placeholder="Jane"
            className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
          />
        </div>
        <div>
          <AuthFieldLabel>Last name</AuthFieldLabel>
          <Input
            placeholder="Smith"
            className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
          />
        </div>
      </div>

      <div className="mb-5">
        <AuthFieldLabel>Company name</AuthFieldLabel>
        <Input
          placeholder="Your jewelry studio or company"
          className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
        />
      </div>

      <div className="mb-5">
        <AuthFieldLabel>Email address</AuthFieldLabel>
        <Input
          type="email"
          placeholder="you@yourcompany.com"
          className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
        />
      </div>

      <div className="mb-6">
        <AuthFieldLabel>Phone number</AuthFieldLabel>
        <Input
          type="tel"
          placeholder="+1 (212) 555-0100"
          className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
        />
      </div>

      <AuthSectionDivider label="Shipping address" />

      <div className="mb-5">
        <AuthFieldLabel>Street address</AuthFieldLabel>
        <Input
          placeholder="123 Main Street, Suite 4"
          className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
        />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_80px_110px]">
        <div>
          <AuthFieldLabel>City</AuthFieldLabel>
          <Input
            placeholder="New York"
            className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
          />
        </div>
        <div>
          <AuthFieldLabel>State</AuthFieldLabel>
          <Input
            placeholder="NY"
            className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
          />
        </div>
        <div>
          <AuthFieldLabel>ZIP code</AuthFieldLabel>
          <Input
            placeholder="10036"
            className="h-9 rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
          />
        </div>
      </div>

      <div className="mb-7">
        <AuthFieldLabel>Country</AuthFieldLabel>
        <select className="h-9 w-full cursor-pointer rounded-[4px] border border-[#e0ddd8] bg-white px-[14px] text-[13px] text-[#050a30] outline-none focus:border-[#233dff]">
          <option value="">Select country...</option>
          <option>United States</option>
          <option>Canada</option>
          <option>United Kingdom</option>
          <option>Other</option>
        </select>
      </div>

      <AuthSectionDivider label="Additional" />

      <div className="mb-7">
        <AuthFieldLabel optional="(optional)">How did you hear about us?</AuthFieldLabel>
        <Input
          placeholder="Referral, event, social media..."
          className="h-[38px] rounded-[4px] border-[#e0ddd8] px-[14px] text-[13px] text-[#050a30] shadow-none focus:ring-0"
        />
      </div>

      <div className="mb-6 flex gap-[10px] rounded-[4px] border border-[#e5e2dc] bg-[#fafaf8] px-[14px] py-3">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="mt-px shrink-0">
          <circle cx="7" cy="7" r="6" stroke="#aaa" strokeWidth="1.2" />
          <line x1="7" y1="6" x2="7" y2="10" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="7" cy="4.5" r="0.7" fill="#aaa" />
        </svg>
        <p className="text-[11px] font-light leading-[1.6]">
          Your account will be reviewed by the RADIIA team. You&apos;ll receive a confirmation email
          once your access has been activated, typically within one business day.
        </p>
      </div>

      <Button className="w-full rounded-[4px] py-[13px] text-xs font-bold uppercase tracking-[0.08em] text-white shadow-none">
        Submit request
      </Button>

      <div className="mt-5 text-center">
        <span className="text-xs font-light">Already have an account? </span>
        <Link href="/login" className="text-xs font-bold text-[#233dff]">
          Sign in →
        </Link>
      </div>
    </>
  );
}
