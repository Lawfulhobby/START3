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
import ContentForm from '@/components/content-form'

function Header() {

    return (
        <Container className="mt-3">
            {/* <Heading as="h1">Manage Your Onboarding Flows</Heading> */}
            <div className="relative isolate overflow-hidden  ">
            <ContentForm/>
            </div>
        </Container>
    )
}

export default function Dashboard() {

    return (
        <main className="h-[200vh] w-full">
            <Header />
        </main>
    )
}
