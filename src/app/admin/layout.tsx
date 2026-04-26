import type { ReactNode } from "react";

export const metadata = {
  title: "Admin"
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-col">{children}</div>;
}
