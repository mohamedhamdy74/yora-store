import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Yora Store",
  description: "متجر يورا لاكسسوارات الموبايل",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cn(cairo.variable)}>
      <body className={`${cairo.className} antialiased bg-gray-50 dark:bg-black selection:bg-blue-100 dark:selection:bg-blue-900/40`}>
        {children}
      </body>
    </html>
  );
}
