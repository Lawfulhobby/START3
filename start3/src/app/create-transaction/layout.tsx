// @ts-nocheck
import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import { AI } from './actions';
import { FlyoutNavbar } from "@/components/FlyoutNavbar";
import SideBarLayout from "./Sidebar";

//👇 Configure our font object
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});
export const metadata: Metadata = {
  title: "Start3",
  description: "Onboarding the next billions users to Web3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AI>
      <html lang="en">
        <body className={'bg-background'}>
          {/* <SideBarLayout> */}
            <main className="relative flex w-full flex-1 flex-col overflow-y-auto h-screen bg-background">
              {children}
            </main>
          {/* </SideBarLayout> */}
        </body>
      </html>
    </AI>
  );
}
