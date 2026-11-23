import type { Metadata } from "next"; import "./globals.css";
export const metadata: Metadata = { title: "HOLYDON SIGNAL — Web Terminal", description: "Live market analysis and demo trading terminal." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }