'use client'

import { useState } from 'react'
import { FlyoutNavbar } from '@/components/FlyoutNavbar'
import { GridCards } from '@/components/GridCards'
import { SendTransaction } from '@/components/send-transaction'

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className=" bg-background">
            <FlyoutNavbar />
            <SendTransaction />
        </div>
    )
}
