import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "HOLYDON BUILDER — AI Website Studio", description: "Describe a website. Build, preview, customize and export it for free." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
