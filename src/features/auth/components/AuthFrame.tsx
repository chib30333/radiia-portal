import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type AuthFrameProps = {
  variant: "login" | "signup";
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthFrame({ variant, title, description, children }: AuthFrameProps) {
  const isSignup = variant === "signup";
  return (
    <div className={isSignup ? "flex flex-col gap-5" : "flex flex-col gap-4"}>
      <Card
        className={
          isSignup
            ? "mx-auto w-full max-w-[480px] overflow-hidden rounded-[8px] border border-[#e5e2dc] px-0 py-0 text-[#050a30] shadow-none"
            : "mx-auto w-full max-w-[420px] overflow-hidden text-[#050a30] rounded-[8px] border border-[#e5e2dc] px-0 py-0 shadow-none"
        }
      >
        <div
          className={
            isSignup
              ? "border-b border-[#f0ede7] px-9 py-8 text-center"
              : "border-b border-[#f0ede7] px-8 py-8 text-center"
          }
        >
          <h1 className="text-3xl font-normal tracking-[0.04em]">{title}</h1>
          <p className={isSignup ? "mt-1 text-xs font-light" : "mt-1 text-sm font-light"}>
            {description}
          </p>
        </div>
        <div className={isSignup ? "px-9 pb-8 pt-7" : "px-8 pb-8 pt-7"}>{children}</div>
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
