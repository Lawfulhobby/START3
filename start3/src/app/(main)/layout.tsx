"use client"
import { RetractingSidebar } from "@/components/RetractingSidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <RetractingSidebar />
           {children}
        </div>
    );
}
