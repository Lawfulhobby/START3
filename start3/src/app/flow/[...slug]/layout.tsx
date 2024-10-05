import type { Metadata } from "next";
import { AI } from './actions';
import { FlyoutNavbar } from "@/components/FlyoutNavbar";

export const metadata: Metadata = {
  title: "Start3",
  description: "Onboarding the next billions users to Web3",
};

type Props = {
  children: React.ReactNode;
  params: {
    slug: string[];
  };
};

export default function RootLayout({
  children,
  params: { slug },
}: Props) {
  return (
    <AI >
      <html lang="en">
        <body className={'bg-background'}>
          <main className="relative flex w-full flex-1 flex-col overflow-y-auto h-screen bg-background">
            {children}
          </main>
        </body>
      </html>
    </AI>
  );
}