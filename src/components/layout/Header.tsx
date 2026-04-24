"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useTheme } from "@/hooks/useTheme";
import { useAccountDropdownHover } from "@/hooks/useAccountDropdownHover";
import { cn } from "@/lib/utils";
import {
  headerLinks,
  type HeaderTab
} from "@/lib/constants/ui-data";
import radiiaLightLogo from "@/assets/RADIIA-light-logo.png";
import radiiaDarkLogo from "@/assets/RADIIA-dark-logo.png";
import { Button } from "../ui/button";
import { CartIcon } from "@/lib/icons";
import { AccountDropdownContent } from "./header/AccountDropdownContent";

type HeaderProps = {
  forceDropdownOpen?: boolean;
};

function resolveActiveTab(pathname: string): HeaderTab | undefined {
  if (pathname.startsWith("/lab-diamonds")) {
    return "lab";
  }

  if (pathname.startsWith("/gemstones")) {
    return "gemstones";
  }

  if (pathname.startsWith("/natural-diamonds")) {
    return "natural";
  }

  if (pathname.startsWith("/items/")) {
    const itemId = pathname.split("/")[2]?.toLowerCase();

    return itemId?.startsWith("s") ? "gemstones" : "natural";
  }

  return undefined;
}

function isAuthHeaderRoute(pathname: string) {
  return (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname.startsWith("/forgot-password/") ||
    pathname === "/reset-password"
  );
}

export function Header({ forceDropdownOpen }: HeaderProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const activeTab = resolveActiveTab(pathname);
  const isAuthRoute = isAuthHeaderRoute(pathname);
  const accountZoneRef = useRef<HTMLDivElement | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  const {
    isOpen,
    openDropdown,
    closeDropdown,
    setIsHoveringTrigger,
    setIsHoveringDropdown
  } = useAccountDropdownHover(forceDropdownOpen);

  useEffect(() => {
    const desktopBreakpoint = window.matchMedia("(min-width: 768px)");

    const syncMobileMenuState = (event?: MediaQueryListEvent) => {
      if ((event?.matches ?? desktopBreakpoint.matches)) {
        setIsMobileMenuOpen(false);
        setIsMobileAccountOpen(false);
      }
    };

    syncMobileMenuState();
    desktopBreakpoint.addEventListener("change", syncMobileMenuState);

    return () => {
      desktopBreakpoint.removeEventListener("change", syncMobileMenuState);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e5e2dc] bg-white backdrop-blur">
      <div className="mx-auto flex w-full  items-center justify-between gap-8 px-6 py-1 sm:px-6 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src={theme === "dark" ? radiiaLightLogo : radiiaDarkLogo}
            alt="RADIIA"
            priority
            className="h-auto w-40"
          />
        </Link>
        {!isAuthRoute ? (
          <div className="hidden items-center gap-6 text-xl md:flex xl:gap-8">
            <div className="hidden md:absolute md:flex md:left-0 md:top-[calc(100%+1px)] px-6 md:py-2 lg:px-12 xl:px-0 items-center gap-6 text-xl xl:relative xl:flex xl:gap-8 bg-white">
              {headerLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "inline-flex text-center uppercase  text-[#888] transition-colors hover:text-",
                    activeTab === item.key ? "border-[#233dff] font-bold text-[#050a30] border-b-2" : "border-transparent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="hidden items-center xl:block xl:gap-8 h-6 w-px bg-[#e5e2dc]" />
            <Link
              href="/favorites"
              className={cn("transition-colors",
                pathname === "/favorites" ? "font-bold text-[#050a30]" : "text-[#888]"
              )}
            >
              Favorites
            </Link>
            <Link
              href={"/saved-searches"}
              className={cn("transition-colors",
                pathname === "/saved-searches" ? "font-bold text-[#050a30]" : "text-[#888]"
              )}
            >
              Saved Searches
            </Link>
            <div className="h-6 w-px bg-[#e5e2dc]" />
            <Link href="/cart" className="relative">
              <CartIcon active={pathname === "/cart"} />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6c92] text-[12px] font-bold text-white">
                3
              </span>
            </Link>
            <div className="h-6 w-px bg-[#e5e2dc]" />
            <div
              ref={accountZoneRef}
              className="relative"
              onMouseEnter={() => {
                setIsHoveringTrigger(true);
                openDropdown();
              }}
              onMouseLeave={() => {
                setIsHoveringTrigger(false);
              }}
              onBlurCapture={(event) => {
                const nextFocused = event.relatedTarget as Node | null;

                if (nextFocused && accountZoneRef.current?.contains(nextFocused)) {
                  return;
                }

                setIsHoveringTrigger(false);
                setIsHoveringDropdown(false);
                closeDropdown();
              }}
            >
              <Button
                variant="noEffect"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onFocus={openDropdown}
                onClick={() => {
                  if (isOpen) {
                    closeDropdown();
                    return;
                  }

                  openDropdown();
                }}
                className="flex items-center gap-2 px-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050a30] text-sm font-bold tracking-[0.05em] text-[#ffc897]">
                  JG
                </div>
                <span className="text-base text-[#050a30] xl:text-lg whitespace-nowrap">Jennifer G.</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[#888] transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </Button>
              {isOpen ? (
                <div
                  className="absolute right-0 top-full z-20 pt-3"
                  onMouseEnter={() => {
                    setIsHoveringDropdown(true);
                    openDropdown();
                  }}
                  onMouseLeave={() => {
                    setIsHoveringDropdown(false);
                  }}
                >
                  <div className="absolute inset-x-0 -top-3 h-3" aria-hidden="true" />
                  <div onFocus={openDropdown}>
                    <div className="absolute right-0 top-[calc(100%-8px)] z-20 w-[360px] overflow-hidden rounded-[8px] border border-[#e5e2dc] bg-white shadow-[0_4px_20px_rgba(5,10,48,0.08)]">
                      <AccountDropdownContent
                        pathname={pathname}
                        onNavigate={() => {
                          setIsHoveringTrigger(false);
                          setIsHoveringDropdown(false);
                          closeDropdown();
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {!isAuthRoute ? (
          <div className="flex items-center gap-2 md:hidden">
            {/* <button
            type="button"
            className="rounded-lg border border-[#e5e2dc] p-2 text-[#050a30]"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button> */}
            <Link href="/cart" className="relative rounded-lg p-2 text-[#050a30]">
              <CartIcon active={pathname === "/cart"} />
              <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff6c92] text-[12px] font-bold text-white">
                3
              </span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((current) => {
                  const next = !current;

                  if (!next) {
                    setIsMobileAccountOpen(false);
                  }

                  return next;
                });
              }}
              className="rounded-lg border p-2 text-[#050a30]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        ) : null}
      </div>
      {!isAuthRoute && isMobileMenuOpen ? (
        <div className="border-t border-[#e5e2dc] bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6">
            <nav className="flex flex-col gap-3 bg-white">
              {headerLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "rounded-xl px-4 py-3 text-base font-medium",
                    activeTab === item.key ? "bg-[#eef1ff] text-[#233dff]" : "bg-[#fafaf8] text-[#050a30]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl bg-[#fafaf8] px-4 py-3 text-base font-medium text-[#050a30]"
              >
                Favorites
              </Link>
            </nav>
            <div
              className="overflow-hidden rounded-2xl border border-[#e5e2dc] bg-[#fafaf8]"
              onMouseEnter={() => setIsMobileAccountOpen(true)}
              onMouseLeave={() => setIsMobileAccountOpen(false)}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
                onClick={() => setIsMobileAccountOpen((current) => !current)}
                onFocus={() => setIsMobileAccountOpen(true)}
                aria-expanded={isMobileAccountOpen}
                aria-label="Toggle account menu"
              >
                <div className="flex gap-4 justify-center items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050a30] text-sm font-bold tracking-[0.05em] text-[#ffc897]">
                    JG
                  </div>
                  <span className="text-[#050a30] text-lg font-bold whitespace-nowrap">Jennifer G.</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-[#888] transition-transform",
                    isMobileAccountOpen && "rotate-180"
                  )}
                />
              </button>
              {isMobileAccountOpen ? (
                <div className="border-t border-[#e5e2dc] bg-white">
                  <AccountDropdownContent
                    pathname={pathname}
                    onNavigate={() => {
                      setIsMobileAccountOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
