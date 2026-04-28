import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  return (
    <>
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
        Sign in
      </Button>
      <div className="mt-5 text-center">
        <span className="text-sm mr-1 font-light">Don&apos;t have an account? </span>
        <Link href="/signup" className="text-xs font-bold text-[#233dff]">
          Request access →
        </Link>
      </div>
    </>
  );
}
