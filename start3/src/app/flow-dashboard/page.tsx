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

// export const metadata: Metadata = {
//     title: 'Start3 Dashboard',
//     description:
//         'Empowering your entry into the world of web3 with AI-driven onboarding flows designed to simplify and personalize the learning experience.',
// }

function Header() {

    return (
        <Container className="mt-16">
            <Heading as="h1">Manage Your Onboarding Flows</Heading>
            {/* <Lead className="mt-6 max-w-3xl">
      Navigate through your customized AI onboarding flows, monitor performance, and gain insights—all in one place.
      </Lead> */}
            {/* <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12"> */}
                <div className="relative isolate overflow-hidden  pt-14">
                    <GridCards />
                </div>

            {/* </section> */}
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
