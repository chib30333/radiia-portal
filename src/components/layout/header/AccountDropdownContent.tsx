import { useTheme } from "@/hooks/useTheme";
import { accountMenuItems } from "@/lib/constants/ui-data";
import { accountMenuIconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

export function AccountDropdownContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="border-b border-[#f0ede7] bg-[#fafaf8] px-5 py-4">
        <div className="mb-0.5 text-[20px] font-bold text-[#050a30]">
          Jennifer Goggin
        </div>
        <div className="text-[16px] font-light text-[#aaa]">
          jennifer@example.com
        </div>
      </div>
      <div className="border-b border-[#f0ede7] px-5 py-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="flex w-full items-center justify-between gap-4 rounded-[10px] border border-[#e5e2dc] bg-white px-4 py-3 text-left transition-colors hover:bg-[#fafaf8]"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6f3ed] text-[#050a30]">
              {theme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </div>
            <div>
              <div className="text-[16px] font-semibold text-[#050a30]">
                Appearance
              </div>
              <div className="text-[14px] text-[#888]">
                {theme === "dark" ? "Dark mode" : "Light mode"}
              </div>
            </div>
          </div>
          <div
            className={cn(
              "relative h-7 w-14 rounded-full border transition-colors duration-300",
              theme === "dark"
                ? "border-[#233dff] bg-[#233dff]"
                : "border-[#d9d4cc] bg-[#f1eee8]",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(5,10,48,0.16)] transition-all duration-300",
                theme === "dark" ? "left-[30px]" : "left-0.5",
              )}
            >
              {theme === "dark" ? (
                <Moon className="h-3.5 w-3.5 text-[#233dff]" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-[#c48a32]" />
              )}
            </span>
          </div>
        </button>
      </div>
      <div className="py-2">
        {accountMenuItems
          .filter((item) => !item.danger)
          .map((item, index) => {
            const Icon = accountMenuIconMap[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex w-full items-center gap-2.5 px-6 py-3 text-left text-[18px] text-[#050a30] transition-colors hover:bg-[#fafaf8]",
                  index === 0 && pathname === "/account" && "bg-[#fafaf8]",
                  isActive && "bg-[#fafaf8]",
                )}
              >
                <Icon className="h-8 w-8 shrink-0 text-[#888]" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
      </div>
      <div className="border-t border-[#f0ede7] py-2">
        {accountMenuItems
          .filter((item) => item.danger)
          .map((item) => {
            const Icon = accountMenuIconMap[item.icon];

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className="flex w-full items-center gap-2.5 px-6 py-3 text-left text-[18px] font-bold text-[#ff6c92] transition-colors hover:bg-[#fff6f9]"
              >
                <Icon className="h-8 w-8 shrink-0 text-[#ff6c92]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
      </div>
    </>
  );
}
