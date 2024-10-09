'use client'

import SwapComponents from '@/components/tools/swap'
import { useState } from 'react'
import { Container } from '@/components/container'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'
import ToolGallery from '@/components/tools/gallery'

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <>
            <div className="relative">
                <Container className="relative">
                    <Navbar
                        banner={
                            <Link
                                href="/"
                                className="flex items-center gap-1 rounded-full bg-[#A479FF] px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-black"
                            >
                              Tools
                            </Link>
                        }
                    />
                    <div className="pb-24  sm:pb-32 md:pb-48">
                       <ToolGallery/>
                    </div>
                </Container>
            </div>
        </>
    )
}
