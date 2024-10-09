import type { Metadata } from "next";
import { AI } from './actions';
import { FlyoutNavbar } from "@/components/FlyoutNavbar";

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
          {/* <FlyoutNavbar /> */}
          {children}
        </body>
      </html>
    </AI>
  );
}
