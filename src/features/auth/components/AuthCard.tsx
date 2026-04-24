import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthCardProps = {
  title: string;
  description: string;
  submitLabel: string;
  variant?: "default" | "login" | "signup";
};

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
      {optional ? <span className="ml-1 normal-case tracking-normal text-[10px] font-light text-[#aaa]">{optional}</span> : null}
    </label>
  );
}

function AuthSectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-[10px]">
      <div className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.1em]">{label}</div>
      <div className="h-px flex-1 bg-[#f0ede7]" />
    </div>
  );
}

export function AuthCard({
  title,
  description,
  submitLabel,
  variant = "default"
}: AuthCardProps) {
  if (variant === "login") {
    return (
      <div className="flex flex-col gap-4">
        <Card className="mx-auto w-full max-w-[420px] overflow-hidden text-[#050a30] rounded-[8px] border border-[#e5e2dc] px-0 py-0 shadow-none">
          <div className="border-b border-[#f0ede7] px-8 py-8 text-center">
            <h1 className="text-3xl font-normal tracking-[0.04em]">
              {title}
            </h1>
            <p className="mt-1 text-sm font-light">{description}</p>
          </div>
          <div className="px-8 pb-8 pt-7">
            <div className="mb-5">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em]">
                Email address
              </label>
              <Input
                type="email"
                placeholder="you@yourcompany.com"
                className="h-9 rounded-[4px] border-[#e0ddd8] px-4 text-sm shadow-none focus:ring-0"
              />
            </div>
            <div className="mb-3">
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em]">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-9 rounded-[4px] border-[#e0ddd8] px-4 text-sm text-[#050a30] shadow-none focus:ring-0"
              />
            </div>
            <div className="mb-6 text-right">
              <Link href="/forgot-password" className="text-xs text-[#233dff]">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full rounded-[4px] py-3 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-none">
              {submitLabel}
            </Button>
            <div className="mt-5 text-center">
              <span className="text-sm mr-1 font-light">Don&apos;t have an account? </span>
              <Link href="/signup" className="text-xs font-bold text-[#233dff]">
                Request access →
              </Link>
            </div>
          </div>
        </Card>
        <div className="text-center">
          <span className="text-sm text-[#888]">
            For assistance, please email{" "}
            <a href="mailto:production@radiia.co" className="text-[#233dff]">
              production@radiia.co
            </a>
          </span>
        </div>
      </div>
    );
  }

  if (variant === "signup") {
    return (
      <div className="flex flex-col gap-5">
        <Card className="mx-auto w-full max-w-[480px] overflow-hidden rounded-[8px] border border-[#e5e2dc] px-0 py-0 text-[#050a30] shadow-none">
          <div className="border-b border-[#f0ede7] px-9 py-8 text-center">
            <h1 className="text-3xl font-normal tracking-[0.04em] text-[#050a30]">
              {title}
            </h1>
            <p className="mt-1 text-xs font-light">{description}</p>
          </div>
          <div className="px-9 pb-8 pt-7">
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="mt-px shrink-0"
              >
                <circle cx="7" cy="7" r="6" stroke="#aaa" strokeWidth="1.2" />
                <line x1="7" y1="6" x2="7" y2="10" stroke="#aaa" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="7" cy="4.5" r="0.7" fill="#aaa" />
              </svg>
              <p className="text-[11px] font-light leading-[1.6]">
                Your account will be reviewed by the RADIIA team. You&apos;ll receive a confirmation email once your
                access has been activated, typically within one business day.
              </p>
            </div>

            <Button className="w-full rounded-[4px] py-[13px] text-xs font-bold uppercase tracking-[0.08em] text-white shadow-none">
              {submitLabel}
            </Button>

            <div className="mt-5 text-center">
              <span className="text-xs font-light">Already have an account? </span>
              <Link href="/login" className="text-xs font-bold text-[#233dff]">
                Sign in →
              </Link>
            </div>
          </div>
        </Card>
        <div className="text-center">
          <span className="text-sm text-[#888]">
            For assistance, please email{" "}
            <a href="mailto:production@radiia.co" className="text-[#233dff]">
              production@radiia.co
            </a>
          </span>
        </div>
      </div>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-xl space-y-6 px-5 py-6 sm:px-8 sm:py-8">
      <div className="space-y-3 text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">Buyer Access</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="text-base leading-7 text-muted-foreground">{description}</p>
      </div>
      <div className="space-y-4">
        <Input placeholder="Business email" type="email" className="h-12 sm:h-14" />
        <Input placeholder="Company name" className="h-12 sm:h-14" />
        <Button className="w-full py-3 text-base sm:text-lg">{submitLabel}</Button>
      </div>
    </Card>
  );
}
