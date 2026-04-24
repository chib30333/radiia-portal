import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Lato } from "next/font/google";

import { Shell } from "@/components/layout/Shell";
import { AppProviders } from "@/components/providers/AppProvider";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant"
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato"
});

export const metadata: Metadata = {
  title: {
    default: "RADIIA Portal",
    template: "%s | RADIIA Portal"
  },
  description:
    "RADIIA wholesale inventory portal foundation for gemstones, natural diamonds, and lab diamonds."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${lato.variable}`}>
      <body className="">
        <AppProviders>
          <Shell>{children}</Shell>
        </AppProviders>
      </body>
    </html>
  );
}
