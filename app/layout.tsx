import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trading Strategy Assistant",
  description: "TradingView strategy development assistant powered by Perplexity AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
