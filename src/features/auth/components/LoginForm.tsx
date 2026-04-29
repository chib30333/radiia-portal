"use client";

import type { Route } from "next";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    setSubmitting(false);
    if (!result || result.error) {
      setError("Invalid email or password, or your account is not yet approved.");
      return;
    }
    const next = (searchParams.get("callbackUrl") ?? "/") as Route;
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-5">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em]" htmlFor="login-email">
          Email address
        </label>
        <Input
          id="login-email"
          type="email"
          placeholder="you@yourcompany.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 rounded-[4px] border-[#e0ddd8] px-4 text-sm shadow-none focus:ring-0"
        />
      </div>
      <div className="mb-3">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.1em]" htmlFor="login-password">
          Password
        </label>
        <Input
          id="login-password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-9 rounded-[4px] border-[#e0ddd8] px-4 text-sm text-[#050a30] shadow-none focus:ring-0"
        />
      </div>
      <div className="mb-6 text-right">
        <Link href="/forgot-password" className="text-xs text-[#233dff]">
          Forgot password?
        </Link>
      </div>
      <Button
        type="submit"
        disabled={submitting}
        className="w-full rounded-[4px] py-3 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-none disabled:opacity-60"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </Button>
      <FieldError variant="submit" message={error} />
      <div className="mt-5 text-center">
        <span className="text-sm mr-1 font-light">Don&apos;t have an account? </span>
        <Link href="/signup" className="text-xs font-bold text-[#233dff]">
          Request access &rarr;
        </Link>
      </div>
    </form>
  );
}
