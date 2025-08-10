import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

 const lato = Lato({
      weight: ['400', '700'],
      subsets: ['latin'],
      display: 'swap',
    });

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} flex flex-col min-h-screen`}>{children}</body>
    </html>
  );
}
