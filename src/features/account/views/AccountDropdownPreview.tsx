import { Header } from "@/components/layout/Header";

export function AccountDropdownPreview() {
  return (
    <div>
      <Header forceDropdownOpen />
      <div className="flex h-[280px] items-center justify-center bg-[#fafaf8]">
        <span className="text-[12px] italic text-[#ccc]">Page content behind dropdown</span>
      </div>
    </div>
  );
}
