import React from 'react'
import { searches } from './Constant';
import { Card } from '@/components/ui/card';
import { Clock4 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SavedSearchCard({ search }: { search: (typeof searches)[number] }) {
  return (
    <Card className="overflow-hidden rounded-lg border border-[#e5e2dc] bg-white p-0 shadow-none">
      <div className="flex flex-col gap-4 border-b border-[#f0ede7] px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="mb-1 flex flex-wrap items-center gap-4">
            <span className="rounded bg-[#eef1ff] px-2 py-1 text-sm font-bold uppercase tracking-[0.08em] text-[#233dff]">
              {search.category}
            </span>
            <span className="text-xl font-bold text-[#050a30]">{search.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock4 size={18} />
            <div className="text-base font-light text-[#aaa]">{search.savedAt}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="px-4 py-2 text-sm uppercase tracking-[0.05em]">Run search</Button>
          <button type="button" className="p-2 text-[#aaa]">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none"><polyline points="1,3 13,3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M2.5 3l.9 9h7.2l.9-9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 3V1.5h4V3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-3 px-5 py-4">
        {search.params.map(([label, value], index) => (
          <div key={`${search.id}-${label}`} className="flex items-center gap-4">
            <div className="min-w-18">
              <div className="text-sm font-bold uppercase tracking-[0.08em] text-[#aaa]">{label}</div>
              <div className={label === "Results" ? "text-base font-bold text-[#233dff]" : "text-base text-[#050a30]"}>{value}</div>
            </div>
            {index < search.params.length - 1 ? <div className="hidden h-8 w-px bg-[#f0ede7] sm:block" /> : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default SavedSearchCard
