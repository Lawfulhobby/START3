'use client'

import { useState } from 'react'
import { FlyoutNavbar } from '@/components/FlyoutNavbar'
import { GridCards } from '@/components/GridCards'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className=" bg-background">
      <FlyoutNavbar />
      <div className="relative isolate overflow-hidden  pt-14">
        <div
          aria-hidden="true"
          className="absolute bg-background p-4 text-primary inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] shadow-xl  sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-primary sm:text-6xl lg:col-span-2 xl:col-auto">
              Welcome to Start3: Your Web3 Journey Begins
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-primary">
                At Start3, we empower newcomers to navigate the exciting world of web3 with ease. Our mission is to simplify blockchain technologies, making them accessible and engaging for everyone.
              </p>
            </div>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1653549892896-dde02867edee?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
            />
          </div>
        </div>
        <GridCards/>
      </div>
    </div>
  )
}
