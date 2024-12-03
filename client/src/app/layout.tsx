import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: "Yinzer FIX",
  description: "No1 Applicance company in Pittsburgh",
};
import 'swiper/css';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.className} antialiased relative overflow-x-hidden bg-[#f3f1fc]`}
      >
        {children}
      </body>
    </html>
  );
}
