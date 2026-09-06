import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Validex | Enterprise Transaction Validation & Processing Platform",
  description:
    "Next-generation transaction validation platform for multi-jurisdiction datasets. Automated data hygiene, country-specific phone & date parsing, deduplication, price integrity audits, and chunked CSV exports.",
  icons: {
    icon: "/validex-icon.svg",
    shortcut: "/validex-icon.svg",
    apple: "/validex-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body
        className="
          min-h-screen
          bg-[#07090e]
          text-slate-100
          antialiased
          selection:bg-cyan-500/20
          selection:text-cyan-200
        "
      >
        {children}
      </body>
    </html>
  );
}