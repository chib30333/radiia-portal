import { ComponentType } from "react";
import type { HeaderAccountIconKey } from "./constants/ui-data";

export function AccountUserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="-2 -2  20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M2 12c0-2.76 2.24-4 5-4s5 1.24 5 4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AccountLockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="-2 -2 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="6"
        width="10"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.5 6V4.5a2.5 2.5 0 015 0V6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AccountHistoryIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="-2 -2 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 9.5L12 7l-2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="5"
        y1="7"
        x2="12"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AccountListIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="-2 -2 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3h10M2 7h7M2 11h5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AccountHeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="-2 -2 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 11.5S2 8 2 5a3 3 0 016 0 3 3 0 016 0c0 3-5 6.5-5 6.5z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function AccountLogoutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="-2 -2 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 2H11a1 1 0 011 1v8a1 1 0 01-1 1H9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M4.5 9.5L2 7l2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="9"
        y1="7"
        x2="2"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartIcon({ active }: { active?: boolean }) {
  const stroke = active ? "#233dff" : "#050a30";

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2h2l2.5 9h9l1.5-6H6"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="16.5" r="1.2" fill={stroke} />
      <circle cx="14" cy="16.5" r="1.2" fill={stroke} />
    </svg>
  );
}

export const accountMenuIconMap: Record<
  HeaderAccountIconKey,
  ComponentType<{ className?: string }>
> = {
  user: AccountUserIcon,
  lock: AccountLockIcon,
  history: AccountHistoryIcon,
  list: AccountListIcon,
  heart: AccountHeartIcon,
  logout: AccountLogoutIcon,
};
