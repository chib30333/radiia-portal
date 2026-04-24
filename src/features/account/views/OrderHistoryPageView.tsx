import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { historyItems } from "../components/Constant";

export function OrderHistoryPageView() {
  return (
    <div>
      <div className="border-b border-[#f0ede7] p-6 md:pt-12 xl:pt-6 lg:px-12 mx-auto  px-6 sm:px-6">
        <div className="mx-auto ">
          <h1 className="font-display text-4xl font-normal tracking-[0.04em] text-[#050a30]">Order / Request history</h1>
          <p className="mt-2 text-sm text-[#aaa]">Track submitted quote, memo, and invoice requests.</p>
        </div>
      </div>
      <div className="bg-[#fafaf8] px-6 py-6 lg:px-12 lg:py-8">
        <div className="mx-auto  space-y-4">
          {historyItems.map((item) => (
            <Card
              key={item.id}
              className="rounded-[8px] border border-[#e5e2dc] bg-white px-6 py-6 shadow-none"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-[18px] font-bold text-[#050a30] sm:text-[22px]">{item.id}</h2>
                    <Badge className="rounded-full bg-[#3154ff] px-4 py-1 text-[11px] font-bold tracking-[0.18em] text-white">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="mt-2 text-[14px] text-[#888] sm:text-[15px]">Created {item.createdAt}</p>
                </div>
                <div className="grid grid-cols-3 gap-6 md:min-w-[300px] md:max-w-[340px] md:flex-shrink-0">
                  <div className="text-left md:text-right">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#aaa]">Status</div>
                    <div className="text-[15px] font-medium text-[#050a30]">{item.status}</div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#aaa]">Items</div>
                    <div className="text-[15px] font-medium text-[#050a30]">{item.items}</div>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#aaa]">Total</div>
                    <div className="text-[18px] font-bold text-[#050a30]">{item.total}</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
