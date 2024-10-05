"use client"
import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import { GridCards } from '@/components/GridCards'
import { FlyoutNavbar } from '@/components/FlyoutNavbar'

function Header() {

    return (
        <Container className="mt-16">
            <Heading as="h1">Manage Your Onboarding Flows</Heading>
            <div className="relative isolate overflow-hidden  pt-8">
                <GridCards />
            </div>
            {/* <Heading as="h4" className='mt-20'>Recent Flows</Heading>
            <div className="relative isolate overflow-hidden  pt-14">
                <GridCards />
            </div> */}
        </Container>
    )
}

export default function Dashboard() {

    return (
        <main className="overflow-hidden">
            <GradientBackground />
            <Container>
                <Navbar
                    banner={
                        <p
                            className="flex items-center gap-1 rounded-full bg-[#A479FF] px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-black"
                        >Dashboard</p>
                    }
                />
            </Container>
            <Header />
        </main>
    )
}
