import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import SectionCard from "../components/SectionCard";
import AccountSidebar from "../components/AccountSidebar";

export function ProfilePageView() {
  return (
    <div>
      <div className="border-b border-[#f0ede7] py-6 md:pt-16 xl:pt-12">
        <div className="mx-auto flex  flex-col gap-8 px-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <div className="flex items-center gap-2 text-[#aaa]">
              <MoveLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <Link href="/" className="cursor-pointer text-sm uppercase tracking-[0.14em] sm:text-base">Back</Link>
            </div>
            <h3 className="font-display mt-3 font-normal tracking-[0.03em] text-[#050a30] sm:text-4xl lg:text-5xl">Account</h3>
          </div>
        </div>
      </div>
      <div className="bg-[#fafaf8] px-6 py-8 lg:px-12">
        <div className="mx-auto flex  flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full lg:w-60 lg:flex-shrink-0">
            <AccountSidebar active="Profile" />
          </div>
          <div className="flex-1 space-y-5">
            <SectionCard title="Company information" action="Edit">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["First name", "Jennifer"],
                  ["Last name", "Goggin"],
                  ["Company", "Goggin Fine Jewelry"],
                  ["Email", "jennifer@gogginfinejewelry.com"]
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-1 text-sm font-bold uppercase tracking-[0.1em] text-[#aaa]">{label}</div>
                    <div className="text-xl text-[#050a30]">{value}</div>
                  </div>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Password" action="Change password">
              <div className="space-y-4 max-w-[340px]">
                <div className="text-base font-light text-[#aaa]">Last changed: not available</div>
                <Input type="password" placeholder="Current password" className="h-11 rounded-md border-[#e0ddd8]" />
                <div>
                  <Input type="password" placeholder="New password" className="h-11 rounded-md border-[#e0ddd8]" />
                  <div className="mt-2 text-sm text-[#aaa]">Minimum 8 characters</div>
                </div>
                <Input type="password" placeholder="Confirm new password" className="h-11 rounded-md border-[#e0ddd8]" />
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button className="px-5 py-2.5 text-base uppercase tracking-[0.06em]">Update password</Button>
                  <Button className="border border-[#e0ddd8] bg-white px-4 py-2.5 text-base text-[#888]">Cancel</Button>
                </div>
              </div>
            </SectionCard>
            <SectionCard title="Shipping address" action="Edit">
              <div className="space-y-4 max-w-2xl">
                <div className="text-base leading-7 text-[#050a30]">
                  Goggin Fine Jewelry<br />48 West 48th Street, Suite 1101<br />New York, NY 10036<br />United States
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input defaultValue="Goggin Fine Jewelry" className="h-11 rounded-md border-[#e0ddd8]" />
                  <Input defaultValue="48 West 48th Street, Suite 1101" className="h-11 rounded-md border-[#233dff]" />
                  <Input defaultValue="New York" className="h-11 rounded-md border-[#e0ddd8]" />
                  <div className="grid grid-cols-[1fr_1fr] gap-4">
                    <Input defaultValue="NY" className="h-11 rounded-md border-[#e0ddd8]" />
                    <Input defaultValue="10036" className="h-11 rounded-md border-[#e0ddd8]" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button className="px-5 py-2.5 text-base uppercase tracking-[0.06em]">Save address</Button>
                  <Button className="border border-[#e0ddd8] bg-white px-4 py-2.5 text-base text-[#888]">Cancel</Button>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
