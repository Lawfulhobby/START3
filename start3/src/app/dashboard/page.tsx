'use client'

import { useState } from 'react'
import { FlyoutNavbar } from '@/components/FlyoutNavbar'
import {GridCards}  from '@/components/GridCards'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className=" bg-background">
      <FlyoutNavbar />
      <div className="relative isolate overflow-hidden  pt-14">
        <GridCards/>
      </div>
    </div>
  )
}
