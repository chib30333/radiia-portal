import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white p-0 shadow-none">
      <div className="flex items-center justify-between border-b border-[#f0ede7] p-6">
        <div className="text-xl font-bold text-[#050a30]">{title}</div>
        {action ? (
          <Button
            variant="noEffect"
            className="rounded-md border border-[#e0ddd8] px-4 py-2 text-base font-bold text-[#233dff]"
          >
            {action}
          </Button>
        ) : null}
      </div>
      <div className="px-6 py-6">{children}</div>
    </Card>
  );
}

export default SectionCard;
