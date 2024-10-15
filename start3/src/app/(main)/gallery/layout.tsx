// @ts-nocheck
import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google';
import { FlyoutNavbar } from "@/components/FlyoutNavbar";
import SideBarLayout from "./Sidebar";
import { AI } from "@/app/flow/[...slug]/actions";

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
      {children}
    </AI>
  );
}
