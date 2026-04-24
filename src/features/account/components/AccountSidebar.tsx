import React from "react";
import { accountSections } from "./Constant";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

function AccountSidebar({
  active,
}: {
  active: (typeof accountSections)[number]["label"];
}) {
  return (
    <Card className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white p-0 shadow-none">
      <div className="py-2">
        {accountSections.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 border-l-4 px-5 py-3 text-xl transition-colors",
              active === item.label
                ? "border-[#233dff] bg-[#f0f2ff] font-bold text-[#050a30]"
                : "border-transparent text-[#888] hover:bg-[#fafaf8] hover:text-[#050a30]",
            )}
          >
            <item.icon
              className={cn(
                "h-4 w-4 shrink-0",
                active === item.label ? "text-[#233dff]" : "text-[#888]",
              )}
            />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}

export default AccountSidebar;
