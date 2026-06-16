import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xeno Transaction Validator",
  description:
    "Xeno Powered Transaction Validation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="
        min-h-screen
        bg-slate-950
        text-white
        antialiased
      "
      >
        {children}
      </body>
    </html>
  );
}