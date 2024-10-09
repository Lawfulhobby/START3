import DashSidebar from "@/components/DashSidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <DashSidebar>
            {children}
        </DashSidebar>
    );
}
