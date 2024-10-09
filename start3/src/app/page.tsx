import { BentoCard } from '@/components/bento-card'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { Gradient, GradientBackground } from '@/components/gradient'
import { Keyboard } from '@/components/keyboard'
import { Link } from '@/components/link'
import { LinkedAvatars } from '@/components/linked-avatars'
import { LogoCloud } from '@/components/logo-cloud'
import { LogoCluster } from '@/components/logo-cluster'
import { LogoTimeline } from '@/components/logo-timeline'
import { Map } from '@/components/map'
import { Navbar } from '@/components/navbar'
import Profile from '@/components/profile'
import { Screenshot } from '@/components/screenshot'
import { Testimonials } from '@/components/testimonials'
import { Heading, Subheading } from '@/components/text'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description:
    'Radiant helps you sell more by revealing sensitive information about your customers.',
}

function Hero() {
  return (
    <div className="relative">
      <GradientBackground/>
      <Container className="relative">
        <Navbar
          banner={
            <Link
              href="/"
              className="flex items-center gap-1 rounded-full bg-[#A479FF] px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-black"
            >
              Read our whitepaper!
              <ChevronRightIcon className="size-4" />
            </Link>
          }
        />
        <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
          <h1 className="font-display text-balance text-6xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
            Bringing the next Billion users On-chain
          </h1>
          <p className="mt-8 max-w-lg text-xl/7 font-medium text-gray-950/75 sm:text-2xl/8">
            Easily step into the world of blockchain with our guided AI platform.
          </p>
        </div>
      </Container>
    </div>
  )
}

function FeatureSection() {
  return (
    <div className="overflow-hidden">
      <Container className="pb-24">
        <Heading as="h2" className="max-w-3xl">
          Customizable AI Flows
        </Heading>
        <Screenshot
          width={1920}
          height={1080}
          src="/screenshots/ai-flow.png"
          className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
        />
      </Container>
    </div>
  )
}

function BentoSection() {
  return (
    <Container className=''>
      <Subheading>Core Features</Subheading>
      <Heading as="h3" className="mt-2 max-w-3xl">
        Explore the Unique Capabilities of Start3
      </Heading>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-8 lg:grid-rows-1 pb-20">
        <BentoCard
          eyebrow="Customization"
          title="Tailored Onboarding Flows"
          description="Customize and deploy interactive onboarding flows that guide new users through the complexities of blockchain technology."
          graphic={
            <div className='p-5 bg-black items-center justify-center flex'>
              <svg width="150" height="150" viewBox="0 0 90 127" fill="#A479FF" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M67.59 116.47V124.77L2.5 87.19V78.89L67.59 116.47Z" stroke="white" strokeLinejoin="round" /><path d="M67.59 83.2799V91.58L2.5 54V45.7L67.59 83.2799Z" stroke="white" strokeLinejoin="round" /><path d="M67.59 50.08V58.38L2.5 20.8V12.5L67.59 50.08Z" stroke="white" strokeLinejoin="round" /><path d="M87.59 40.08L79.89 43.93L67.59 50.08L2.5 12.5L22.5 2.5L87.59 40.08Z" stroke="white" strokeLinejoin="round" /><path d="M87.5898 40.08V48.38L67.5898 58.38V50.08L79.8898 43.93L87.5898 40.08Z" stroke="white" strokeLinejoin="round" /><path d="M87.59 73.2799L79.89 77.1299L67.59 83.2799L2.5 45.7L22.5 35.7L87.59 73.2799Z" stroke="white" strokeLinejoin="round" /><path d="M87.5898 73.28V81.58L67.5898 91.58V83.28L79.8898 77.13L87.5898 73.28Z" stroke="white" strokeLinejoin="round" /><path d="M87.59 106.47L79.89 110.32L67.59 116.47L2.5 78.89L22.5 68.89L87.59 106.47Z" stroke="white" strokeLinejoin="round" /><path d="M87.5898 106.47V114.77L67.5898 124.77V116.47L79.8898 110.32L87.5898 106.47Z" stroke="white" strokeLinejoin="round" /></svg>
            </div>
          }
          // fade={['bottom']}
          className="max-lg:rounded-t-4xl lg:col-span-2 lg:rounded-tl-4xl"
        />
        <BentoCard
          eyebrow="Integration"
          title="Seamless Tool Integration"
          description="Integrate a variety of blockchain tools and services directly into your onboarding flows for a comprehensive educational experience."
          graphic={
            <div className='p-5 bg-black items-center justify-center flex'>
              <svg width="150" height="150" viewBox="0 0 111 115" fill="#A479FF" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M108.6 77.5551L88.5997 87.5551L45.9098 13.925L45.2998 12.875L65.2998 2.875L108.6 77.5551Z" stroke="white" strokeLinejoin="round" /><path d="M88.6 87.5551L64.6901 101.185L45.3 112.245L2 37.5551L45.3 12.875L45.91 13.925L88.6 87.5551Z" stroke="white" strokeLinejoin="round" /><path d="M108.6 77.5552L65.2998 102.245L45.2998 112.245L64.6898 101.185L88.5997 87.5552L108.6 77.5552Z" stroke="white" strokeLinejoin="round" /></svg>
            </div>
          }
          // fade={['bottom']}
          className="lg:col-span-2 lg:rounded-tr-4xl"
        />
        <BentoCard
          eyebrow="AI Assistance"
          title="Intelligent AI Guidance"
          description="Leverage BlockBuddy, your AI companion, to provide real-time assistance and support throughout the onboarding process."
          graphic={
            <div className='p-5 bg-black items-center justify-center flex'>
              <svg width="150" height="150" viewBox="0 0 99 108" fill="#A479FF" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M36.3201 55.91V101.84L2.95996 36.65L36.3201 55.91Z" stroke="white" strokeLinejoin="round" /><path d="M52.0701 13.5L32.0701 23.5L22.76 18.13L12.1501 12L32.1501 2L52.0701 13.5Z" stroke="white" strokeLinejoin="round" /><path d="M32.0701 23.5L31.3101 24.8199L28.4399 29.8099L26.4001 33.36L22.01 40.99L9.14014 33.5599L2 29.4399L12.1501 12L22.76 18.13L32.0701 23.5Z" stroke="white" strokeLinejoin="round" /><path d="M52.0701 13.5L46.3601 23.4301L38.6401 27.29L37.8701 28.6L34.9399 33.5699L34.1401 34.92V34.9301L28.6101 37.6899L22.01 40.99L26.4001 33.36L28.4399 29.8099L31.3101 24.8199L32.0701 23.5L52.0701 13.5Z" stroke="white" strokeLinejoin="round" /><path d="M59.8 17.96L57.6001 19.0599L45.3501 25.1801V25.1899L39.8 27.96L38.6401 27.29L46.3601 23.4301L58.6401 17.29L59.8 17.96Z" stroke="white" strokeLinejoin="round" /><path d="M50.05 57.1801L48.3 56.17L42.5 52.8199L33.78 47.79L28.3901 44.6801L30.4199 41.23L34.1401 34.9301V34.92L34.9399 33.5699L37.8701 28.6L38.6401 27.29L39.8 27.96L40.5701 30.16L41.03 31.48L43.5 38.51L47.6201 50.26L49.49 55.58L50.05 57.1801Z" stroke="white" strokeLinejoin="round" /><path d="M53.8501 53.39L54.4099 55L50.05 57.1801L49.49 55.58L47.6201 50.26L43.5 38.51L41.03 31.48L40.5701 30.16L39.8 27.96L45.3501 25.1899V25.1801L57.6001 19.0599L59.8 17.96L61.9199 23.99L51.6699 29.11V29.12L46.3801 31.76L50.01 42.27L52.01 48.0599L53.8501 53.39Z" stroke="white" strokeLinejoin="round" /><path d="M86.29 33.26L72.7 40.0599L68.3201 42.25L66.29 43.26L49.1599 33.37L46.3801 31.76L51.6699 29.12V29.11L61.9199 23.99L66.3801 21.76L86.29 33.26Z" stroke="white" strokeLinejoin="round" /><path d="M95.48 68.52L62.1201 95.1899L42.1201 105.19L62.1201 89.2L75.48 78.52L95.48 68.52Z" stroke="white" strokeLinejoin="round" /><path d="M95.48 68.52L75.48 78.52L62.1201 70.8099L56.3201 67.46L42.1201 59.26L48.3 56.17L50.05 57.1801L54.4099 55L56.3201 60.54L56.4299 60.86L62.1201 64.15L76.45 72.42L90.27 65.51L95.48 68.52Z" stroke="white" strokeLinejoin="round" /><path d="M75.48 78.52L62.1201 89.2L42.1201 105.19V59.26L56.3201 67.46L62.1201 70.8099L75.48 78.52Z" stroke="white" strokeLinejoin="round" /><path d="M48.3 56.17L42.1201 59.26V98.9399L36.3201 101.84V55.91L37.6001 55.27L42.5 52.8199L48.3 56.17Z" stroke="white" strokeLinejoin="round" /><path d="M42.5 52.8199L37.6001 55.27L36.3201 55.91L2.95996 36.65L9.14014 33.5599L22.01 40.99L28.6101 37.6899L34.1401 34.9301L30.4199 41.23L28.3901 44.6801L33.78 47.79L42.5 52.8199Z" stroke="white" strokeLinejoin="round" /><path d="M76.45 72.42L62.1201 64.15L56.4299 60.86L56.3201 60.54L54.4099 55L53.8501 53.39L52.01 48.0599L50.01 42.27L46.3801 31.76L49.1599 33.37L66.29 43.26L67.05 45.45L68.01 48.2L69.96 53.78L76.45 72.42Z" stroke="white" strokeLinejoin="round" /><path d="M96.45 62.42L90.27 65.51L76.45 72.42L69.96 53.78L68.01 48.2L67.05 45.45L66.29 43.26L68.3201 42.25L72.7 40.0599L86.29 33.26L96.45 62.42Z" stroke="white" strokeLinejoin="round" /></svg>
            </div>
          }
          className="lg:col-span-2 lg:rounded-bl-4xl"
        />
        <BentoCard
          eyebrow="Accessibility"
          title="Global Accessibility"
          description="Ensure easy access and engagement for users worldwide with multi-language support and global compliance standards."
          graphic={
            <div className='p-5 bg-black items-center justify-center flex'>
              <svg width="150" height="150" viewBox="0 0 109 120" fill="#A479FF" xmlns="http://www.w3.org/2000/svg" strokeWidth="0.5px" strokeLinecap="round" strokeLinejoin="round"><path d="M68.39 57.1001C67.34 56.2901 66.16 55.5101 64.84 54.7501C63.53 53.9901 62.3201 53.3601 61.2101 52.8501C60.8001 51.0801 60.0498 49.3701 58.9698 47.7501C58.6498 47.2701 58.3201 46.8302 57.9601 46.4202C57.1101 45.4202 56.15 44.6101 55.08 43.9901C54.8 43.8301 54.5299 43.6901 54.2699 43.5701C53.7199 43.3001 53.2099 43.1102 52.7399 43.0102C51.7799 42.7802 50.9599 42.8802 50.2999 43.2902C49.7399 43.6502 49.0699 44.0901 48.2999 44.6301C47.5099 45.1801 46.62 45.8301 45.62 46.5701L42.38 44.7001C40.33 40.7701 38.74 37.8201 37.6 35.8601C37.27 35.3001 36.9199 34.7802 36.5199 34.2902C36.5099 34.2602 36.4801 34.2301 36.4501 34.2001C35.5001 33.0101 34.3499 32.0201 32.9999 31.2401C31.1699 30.2001 29.6601 29.9902 28.4501 30.6402C28.4201 30.6502 28.39 30.6602 28.36 30.6802C27.14 31.3702 26.5199 32.8002 26.5199 34.9402C26.5199 36.0902 26.73 37.4001 27.16 38.8501C27.3 39.3401 27.47 39.8501 27.66 40.3701C28.04 41.4001 28.4899 42.4902 29.0099 43.6602C29.5499 44.8502 30.17 46.1102 30.86 47.4402C32.23 50.0802 33.89 53.0001 35.85 56.2101C36.31 56.9601 36.7699 57.7201 37.2499 58.5001C38.0199 59.7301 38.81 61.0001 39.63 62.3201C40.51 63.7401 41.43 65.2001 42.38 66.7101L37.38 69.5502C36.38 67.9502 35.4199 66.4002 34.4899 64.8902C33.6799 63.5802 32.89 62.3002 32.14 61.0602C31.42 59.8902 30.7399 58.7502 30.0699 57.6402C27.8799 54.0002 26 50.6001 24.42 47.4501C24.11 46.8201 23.8099 46.2101 23.5199 45.6001C23.4399 45.4101 23.3499 45.2302 23.2699 45.0502C22.7199 43.8402 22.2299 42.6702 21.7999 41.5302C21.4199 40.5302 21.0799 39.5601 20.7899 38.6101C20.0799 36.3301 19.6699 34.1701 19.5499 32.1101C19.5499 31.9301 19.5299 31.7501 19.5199 31.5701C19.5099 31.3401 19.5099 31.1202 19.5099 30.8902C19.5099 26.5402 20.81 23.6202 23.41 22.1402L23.9698 21.8601C26.4598 20.7201 29.4799 21.1601 32.9999 23.2001C33.2399 23.3401 33.44 23.4701 33.62 23.6101C33.79 23.7401 33.9999 23.8802 34.2299 24.0102C33.9999 23.2102 33.8201 22.4401 33.7001 21.7001C33.5901 20.9601 33.5299 20.2201 33.5299 19.4901C33.5299 18.5601 33.6099 17.7201 33.7699 16.9601C34.1699 14.9701 35.11 13.5601 36.59 12.7101L37.0699 12.4701C38.5999 11.7901 40.36 11.8502 42.35 12.6702C42.41 12.6902 42.4699 12.7101 42.5299 12.7401C43.0199 12.9501 43.5199 13.2001 44.0399 13.5001C46.6999 15.0301 48.99 17.3302 50.92 20.3902C51.11 20.6902 51.2999 21.0002 51.4799 21.3102C53.5299 24.8402 54.5499 28.2701 54.5499 31.6201C54.5499 32.3601 54.49 33.0101 54.37 33.5801C54.26 34.1501 54.08 34.7001 53.85 35.2401L55.08 35.9501C56.75 36.9101 58.2999 38.1002 59.7299 39.5102C61.0799 40.8502 62.3299 42.3901 63.4799 44.1301C63.6499 44.4101 63.8299 44.6901 64.0099 44.9801C65.7399 47.8001 66.9798 50.6402 67.7198 53.5102C68.0298 54.7002 68.25 55.9001 68.39 57.1001Z" stroke="white" strokeLinejoin="round" /><path d="M52.7399 43.01L48.5699 45.1L45.62 46.5699C46.62 45.8299 47.5099 45.18 48.2999 44.63C49.0699 44.09 49.7399 43.65 50.2999 43.29C50.9599 42.88 51.7799 42.78 52.7399 43.01Z" stroke="white" strokeLinejoin="round" /><path d="M99.9501 75.1799C99.9501 76.8599 99.7299 78.3198 99.2899 79.5798C98.8599 80.8298 98.23 81.8999 97.41 82.7599L77.41 92.7599C77.8 92.3599 78.1401 91.8999 78.4401 91.4099C78.7801 90.8499 79.0599 90.2398 79.2899 89.5798C79.7299 88.3198 79.9501 86.8599 79.9501 85.1799C79.9501 81.7499 79.2199 78.4298 77.7699 75.2198C77.1199 73.7898 76.33 72.3799 75.4 70.9999C74.11 69.0899 72.7299 67.3698 71.2599 65.8398C70.5799 65.1498 69.9001 64.4999 69.1901 63.8899C67.8001 62.6899 66.3299 61.6399 64.7999 60.7599C64.6499 60.6699 64.5 60.5899 64.35 60.5099C63.16 59.8399 61.92 59.2398 60.63 58.6998C60.29 58.5498 59.95 58.4099 59.61 58.2899C59.54 58.2599 59.46 58.2298 59.39 58.2098H59.38C58.22 57.7598 57.0399 57.3699 55.8099 57.0199C55.5399 56.9499 55.2699 56.8699 54.9899 56.7999C52.6699 56.1999 50.14 55.5999 47.39 54.9799C46.69 54.8299 45.9699 54.6699 45.2399 54.5099H45.2299C44.4399 54.3399 43.6399 54.1599 42.8099 53.9899L45.5599 52.6199L51.33 49.7299L56.4401 47.1699L57.9601 46.4199C58.3201 46.8299 58.6498 47.2699 58.9698 47.7499C60.0498 49.3699 60.8001 51.0799 61.2101 52.8499C62.3201 53.3599 63.53 53.9899 64.84 54.7499C66.16 55.5099 67.34 56.2899 68.39 57.0999L73.1901 54.6998H73.2001L82.9899 49.7999H82.9999C83.6099 50.0999 84.2099 50.4199 84.7999 50.7599C88.8299 53.0799 92.36 56.4999 95.4 60.9999C98.43 65.4999 99.9501 70.2299 99.9501 75.1799Z" stroke="white" strokeLinejoin="round" /><path d="M106.08 99.53C106.08 102.88 105.07 105.15 103.06 106.33L102.39 106.66L83.0599 116.33C85.0699 115.15 86.08 112.88 86.08 109.53C86.08 106.65 85.26 103.58 83.63 100.32C83.59 100.24 83.5499 100.15 83.4899 100.07C81.8799 96.9399 79.86 94.5 77.41 92.76L97.41 82.76C99.92 84.55 101.99 87.0699 103.63 90.3199C105.26 93.5799 106.08 96.65 106.08 99.53Z" stroke="white" strokeLinejoin="round" /><path d="M86.08 109.53C86.08 112.88 85.0699 115.15 83.0599 116.33C81.0399 117.51 78.5499 117.24 75.5699 115.52C74.0499 114.64 72.58 113.41 71.15 111.81C70.04 110.58 69.0799 109.23 68.2699 107.78C68.0299 107.36 67.81 106.94 67.6 106.5C66.83 107.9 65.8601 108.93 64.6801 109.58L64.2799 109.78L64.16 109.83C63.68 110.03 63.18 110.18 62.65 110.27C60.52 110.65 58.08 110.05 55.34 108.46C54.05 107.72 52.7799 106.79 51.5299 105.66C50.2699 104.53 49.06 103.2 47.89 101.65C48.54 101.09 49.1799 100.35 49.8199 99.45C50.4599 98.55 51.0499 97.7101 51.5699 96.9401C52.2099 97.7801 52.8599 98.4901 53.4999 99.0601C54.1399 99.6301 54.7801 100.1 55.4301 100.47C57.2901 101.55 58.86 101.7 60.11 100.92C61.37 100.13 61.9899 98.7 61.9899 96.63C61.9899 95.35 61.7599 93.85 61.2899 92.1V92.08C60.9299 90.76 60.5299 89.2001 60.0699 87.4301C60.0499 87.3701 60.0399 87.3 60.0199 87.24C59.8899 86.75 59.76 86.24 59.63 85.71L61.2899 83.46C62.3199 83.83 63.36 84.17 64.42 84.5C65.9 84.96 67.4101 85.39 68.9601 85.77C71.6101 86.44 72.9401 84.89 72.9401 81.14C72.9401 80.01 72.7898 78.92 72.4698 77.87C72.0598 76.44 71.35 75.0899 70.36 73.8199C70.15 73.5499 69.9301 73.28 69.7101 73.02C68.1701 71.21 66.4901 69.78 64.7101 68.75C64.1101 68.4 63.49 68.07 62.84 67.76C62.6 67.65 62.36 67.5401 62.11 67.4301H62.1C60.29 66.6201 58.31 65.95 56.13 65.4C54.28 64.94 52.2499 64.47 50.0399 64H50.0299C49.6699 63.92 49.3101 63.84 48.9401 63.77C48.7901 63.73 48.6298 63.7 48.4698 63.67H48.4601C47.8401 63.54 47.23 63.41 46.58 63.28C45.95 63.15 45.31 63.03 44.65 62.9L44.0699 60.09L43.13 55.5601L42.8099 53.99C43.6399 54.16 44.4399 54.34 45.2299 54.51H45.2399C45.9699 54.67 46.69 54.83 47.39 54.98C50.14 55.6 52.6699 56.2 54.9899 56.8C55.2699 56.87 55.5399 56.95 55.8099 57.02C57.0399 57.37 58.22 57.76 59.38 58.21H59.39C59.46 58.23 59.54 58.26 59.61 58.29C59.95 58.41 60.29 58.55 60.63 58.7C61.92 59.24 63.16 59.84 64.35 60.51C64.5 60.59 64.6499 60.67 64.7999 60.76C66.3299 61.64 67.8001 62.69 69.1901 63.89C69.9001 64.5 70.5799 65.15 71.2599 65.84C72.7299 67.37 74.11 69.09 75.4 71C76.33 72.38 77.1199 73.79 77.7699 75.22C79.2199 78.43 79.9501 81.7501 79.9501 85.1801C79.9501 86.8601 79.7299 88.32 79.2899 89.58C79.0599 90.24 78.7801 90.85 78.4401 91.41C78.1401 91.9 77.8 92.36 77.41 92.76C79.86 94.5 81.8799 96.9399 83.4899 100.07C83.5499 100.15 83.59 100.24 83.63 100.32C85.26 103.58 86.08 106.65 86.08 109.53Z" stroke="white" strokeLinejoin="round" /><path d="M46.2198 65.1301C46.1898 65.4001 46.17 65.6602 46.17 65.9302L45.09 66.4701C44.8 67.9701 44.4 70.1601 43.91 73.0201C43.75 73.9201 43.57 74.8102 43.38 75.6802C42.94 77.5702 42.3999 79.3801 41.7599 81.1301C40.8299 83.6701 39.63 85.6601 38.17 87.0901C36.71 88.5301 34.87 88.6101 32.65 87.3301C30.84 86.2801 29.3099 84.6402 28.0499 82.4102C26.7999 80.1802 26.17 78.0602 26.17 76.0502C26.17 74.8402 26.41 73.6201 26.87 72.3801C27.34 71.1401 27.8899 69.6401 28.5399 67.8601L29.83 67.2101L34.4899 64.8901C35.4199 66.4001 36.38 67.9502 37.38 69.5502L46.2198 65.1301Z" stroke="white" strokeLinejoin="round" /><path d="M34.4899 64.89L29.83 67.21L28.5399 67.86L27.1801 64.46L26.87 63.6901L32.14 61.0601C32.89 62.3001 33.6799 63.58 34.4899 64.89Z" stroke="white" strokeLinejoin="round" /><path d="M74.5499 21.62C74.5499 22.36 74.49 23.01 74.37 23.58C74.26 24.15 74.08 24.7 73.85 25.24L60.83 31.75L53.85 35.24C54.08 34.7 54.26 34.15 54.37 33.58C54.49 33.01 54.5499 32.36 54.5499 31.62C54.5499 28.27 53.5299 24.8401 51.4799 21.3101C51.2999 21.0001 51.11 20.6901 50.92 20.3901C48.99 17.3301 46.6999 15.03 44.0399 13.5C43.5199 13.2 43.0199 12.95 42.5299 12.74C42.4699 12.71 42.41 12.6901 42.35 12.6701C40.36 11.8501 38.5999 11.79 37.0699 12.47L56.59 2.71001C58.64 1.55001 61.1199 1.81005 64.0399 3.50005C66.9599 5.18005 69.4399 7.79011 71.4799 11.3101C73.5299 14.8401 74.5499 18.27 74.5499 21.62Z" stroke="white" strokeLinejoin="round" /><path d="M61.9899 96.6301C61.9899 98.7001 61.37 100.13 60.11 100.92C58.86 101.7 57.2901 101.55 55.4301 100.47C54.7801 100.1 54.1399 99.6302 53.4999 99.0602C52.8599 98.4902 52.2099 97.7802 51.5699 96.9402L61.2899 92.0801V92.1001C61.7599 93.8501 61.9899 95.3501 61.9899 96.6301Z" stroke="white" strokeLinejoin="round" /><path d="M51.92 72.5199C51.69 73.6999 51.44 74.9599 51.17 76.2799C50.81 77.9899 50.4199 79.8199 49.9999 81.7599C49.8899 82.2699 49.77 82.7699 49.64 83.2599C48.92 86.1099 47.9699 88.6899 46.7999 91.0199C45.4299 93.7499 43.62 95.6699 41.37 96.7799C39.12 97.8899 36.21 97.4199 32.65 95.3699C29.97 93.8199 27.5601 91.6199 25.4301 88.7799C23.3001 85.9399 21.6499 82.7799 20.4799 79.2899C19.5399 80.1599 18.3601 80.5699 16.9301 80.5099C15.5001 80.4499 14.0299 79.9899 12.5099 79.1099C9.52989 77.3899 7.03002 74.7799 5.02002 71.2699C3.00002 67.7599 2 64.3299 2 60.9799C2 58.0999 2.81995 55.9799 4.44995 54.6099C4.74995 54.3599 5.07002 54.1499 5.40002 53.9899L5.65002 53.8699C7.07002 53.2499 8.74004 53.3799 10.67 54.2299C10.31 53.4299 9.98007 52.6298 9.70007 51.8398C9.33007 50.8398 9.02992 49.8499 8.78992 48.8699C8.34992 47.1099 8.13 45.3898 8.13 43.7198C8.13 41.0398 8.73004 38.8698 9.92004 37.2198C10.53 36.3698 11.27 35.7099 12.14 35.2399L12.7299 34.9498C13.4099 34.6698 14.1501 34.4799 14.9601 34.3999C15.2501 35.7699 15.65 37.2898 16.14 38.9498C16.64 40.6098 17.21 42.1299 17.85 43.4999C17.03 43.7699 16.39 44.2799 15.92 45.0499C15.46 45.8199 15.2198 46.7799 15.2198 47.9199C15.2198 48.3099 15.2299 48.6899 15.2699 49.0599C15.5099 52.2999 16.8499 54.9999 19.2499 57.1799C21.6899 59.3699 24.0101 61.3599 26.2001 63.1399C26.4201 63.3299 26.65 63.5099 26.87 63.6899L27.1801 64.4598L28.5399 67.8599C27.8899 69.6399 27.34 71.1399 26.87 72.3799C26.41 73.6199 26.17 74.8399 26.17 76.0499C26.17 78.0599 26.7999 80.1799 28.0499 82.4099C29.3099 84.6399 30.84 86.2798 32.65 87.3298C34.87 88.6098 36.71 88.5298 38.17 87.0898C39.63 85.6598 40.8299 83.6699 41.7599 81.1299C42.3999 79.3799 42.94 77.5699 43.38 75.6799C43.57 74.8099 43.75 73.9199 43.91 73.0199C44.4 70.1599 44.8 67.9698 45.09 66.4698L46.2799 67.5299L51.92 72.5199Z" stroke="white" strokeLinejoin="round" /><path d="M21.7999 41.5299L17.85 43.4999C17.21 42.1299 16.64 40.6098 16.14 38.9498C15.65 37.2898 15.2501 35.7699 14.9601 34.3999L19.5499 32.1099C19.6699 34.1699 20.0799 36.3299 20.7899 38.6099C21.0799 39.5599 21.4199 40.5299 21.7999 41.5299Z" stroke="white" strokeLinejoin="round" /><path d="M34.2299 24.01C33.9999 23.88 33.79 23.74 33.62 23.61C33.44 23.47 33.2399 23.34 32.9999 23.2C29.4799 21.16 26.4598 20.72 23.9698 21.86L33.7699 16.96C33.6099 17.72 33.5299 18.56 33.5299 19.49C33.5299 20.22 33.5901 20.96 33.7001 21.7C33.8201 22.44 33.9999 23.21 34.2299 24.01Z" stroke="white" strokeLinejoin="round" /><path d="M19.5499 32.1099L14.9601 34.3999C14.1501 34.4799 13.4099 34.6698 12.7299 34.9498L19.5199 31.5698C19.5199 31.7498 19.5399 31.9299 19.5499 32.1099Z" stroke="white" strokeLinejoin="round" /><path d="M10.67 54.2299C8.74004 53.3799 7.07002 53.2499 5.65002 53.8699L9.70007 51.8398C9.98007 52.6298 10.31 53.4299 10.67 54.2299Z" stroke="white" strokeLinejoin="round" /><path d="M32.14 61.0601L26.87 63.6901C26.65 63.5101 26.4201 63.33 26.2001 63.15C24.0101 61.36 21.6899 59.3701 19.2499 57.1801C16.8499 55.0001 15.5099 52.3001 15.2699 49.0601C15.2299 48.6901 15.2198 48.31 15.2198 47.92C15.2198 46.78 15.46 45.82 15.92 45.05C16.39 44.28 17.03 43.77 17.85 43.5L21.7999 41.53C22.2299 42.67 22.7199 43.84 23.2699 45.05C23.3499 45.23 23.4399 45.41 23.5199 45.6C23.8099 46.21 24.11 46.82 24.42 47.45C26 50.6 27.8799 54 30.0699 57.64C30.7399 58.75 31.42 59.8901 32.14 61.0601Z" stroke="white" strokeLinejoin="round" /><path d="M72.9401 81.1401C72.9401 84.8901 71.6101 86.4401 68.9601 85.7701C67.4101 85.3901 65.9 84.9601 64.42 84.5001C63.36 84.1701 62.3199 83.8301 61.2899 83.4601L66.9999 80.6101L72.4698 77.8701C72.7898 78.9201 72.9401 80.0101 72.9401 81.1401Z" stroke="white" strokeLinejoin="round" /><path d="M69.7101 73.0201C69.0101 75.8001 68.1099 78.3201 66.9999 80.6001L61.2899 83.4601L59.63 85.7101C59.76 86.2401 59.8899 86.7501 60.0199 87.2401C60.0399 87.3001 60.0499 87.3702 60.0699 87.4302L41.37 96.7802C43.62 95.6702 45.4299 93.7501 46.7999 91.0201C47.9699 88.6901 48.92 86.1101 49.64 83.2601C49.77 82.7701 49.8899 82.2701 49.9999 81.7601C50.4199 79.8201 50.81 77.9902 51.17 76.2802C51.44 74.9602 51.69 73.7001 51.92 72.5201L62.1 67.4302H62.11C62.36 67.5402 62.6 67.6501 62.84 67.7601C63.49 68.0701 64.1101 68.4001 64.7101 68.7501C66.4901 69.7801 68.1701 71.2101 69.7101 73.0201Z" stroke="white" strokeLinejoin="round" /><path d="M62.1 67.4301L51.92 72.52L46.2799 67.53L45.09 66.47L46.17 65.9301L50.0299 64H50.0399C52.2499 64.47 54.28 64.94 56.13 65.4C58.31 65.95 60.29 66.6201 62.1 67.4301Z" stroke="white" strokeLinejoin="round" /><path d="M88.39 47.1L82.9999 49.8H82.9899L73.2001 54.7H73.1901L68.39 57.1C68.25 55.9 68.0298 54.7 67.7198 53.51C66.9798 50.64 65.7399 47.8 64.0099 44.98C63.8299 44.69 63.6499 44.41 63.4799 44.13C62.3299 42.39 61.0799 40.85 59.7299 39.51C58.2999 38.1 56.75 36.91 55.08 35.95L53.85 35.24L60.83 31.75L73.85 25.24L75.08 25.95C78.58 27.97 81.5599 30.98 84.0099 34.98C86.4599 38.97 87.92 43.01 88.39 47.1Z" stroke="white" strokeLinejoin="round" /><path d="M45.5599 52.6201L42.8099 53.9901L43.13 55.5602L44.0699 60.0901L44.65 62.9001C45.31 63.0301 45.95 63.1501 46.58 63.2801C47.23 63.4101 47.8401 63.5402 48.4601 63.6702L46.2599 64.7701L42.38 66.7101C41.43 65.2001 40.51 63.7401 39.63 62.3201C38.81 61.0001 38.0199 59.7301 37.2499 58.5001C36.7699 57.7201 36.31 56.9601 35.85 56.2101C33.89 53.0001 32.23 50.0802 30.86 47.4402C30.17 46.1102 29.5499 44.8501 29.0099 43.6601C28.4899 42.4901 28.04 41.4001 27.66 40.3701C27.47 39.8501 27.3 39.3401 27.16 38.8501C26.73 37.4001 26.5199 36.0902 26.5199 34.9402C26.5199 32.8002 27.14 31.3702 28.36 30.6802C28.39 30.6602 28.4201 30.6501 28.4501 30.6401C29.6601 29.9901 31.1699 30.2001 32.9999 31.2401C34.3499 32.0201 35.5001 33.0101 36.4501 34.2001C36.4801 34.2301 36.5099 34.2601 36.5199 34.2901C36.9199 34.7801 37.27 35.3001 37.6 35.8601C38.74 37.8201 40.33 40.7701 42.38 44.7001L45.62 46.5701L48.5699 45.1001L52.7399 43.0101C53.2099 43.1101 53.7199 43.3001 54.2699 43.5701C54.7699 44.4201 55.3 45.3101 55.85 46.2101C56.04 46.5301 56.2401 46.8502 56.4401 47.1702L51.33 49.7301L45.5599 52.6201Z" stroke="white" strokeLinejoin="round" /><path d="M48.9401 63.7699L46.2198 65.1299L37.38 69.5499L42.38 66.7098L46.2599 64.7699L48.4601 63.6699H48.4698C48.6298 63.6999 48.7901 63.7299 48.9401 63.7699Z" stroke="white" strokeLinejoin="round" /><path d="M68.2699 107.78L64.6801 109.58C65.8601 108.93 66.83 107.9 67.6 106.5C67.81 106.94 68.0299 107.36 68.2699 107.78Z" stroke="white" strokeLinejoin="round" /><path d="M64.16 109.83L64.2799 109.78L64.6801 109.58" stroke="white" strokeLinejoin="round" /></svg>
            </div>
          }
          className="max-lg:rounded-b-4xl lg:col-span-2 lg:rounded-br-4xl"
        />
      </div>
    </Container>
  )
}

function DarkBentoSection() {
  return (
    <div className="mx-2 mt-2 rounded-4xl bg-black py-32">
      <Container>
        <Subheading dark>How It Works</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Discover How Start3 Simplifies Your Web3 Journey
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow="Step 1"
            title="Create Your Flow"
            description="Select a template or start from scratch to build your custom onboarding flow using our intuitive flow builder."
            graphic={
              <div className="h-80 bg-[url(/screenshots/dashboardd.png)] bg-cover bg-center" />
            }
            // fade={['top']}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Step 2"
            title="Customize Interactions"
            description="Integrate various blockchain tools and set up interactions tailored to your needs, enhancing the educational value of each session."
            graphic={
              <div className="h-80 bg-[url(/screenshots/builderr.png)] bg-cover bg-center" />
          }
            className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow="Step 3"
            title="Deploy and Engage"
            description="Launch your personalized onboarding experience to users and engage them with real-time AI support throughout their learning journey."
            graphic={<LinkedAvatars />}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow="Step 4"
            title="Analyze and Optimize"
            description="Monitor user interactions and gather insights to continuously refine and optimize the onboarding process, ensuring maximum effectiveness."
            graphic={
              <div className="h-80 bg-[url(/screenshots/aii.png)] bg-cover bg-center" />
            }
            fade={['top']}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
    </div>
  )
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <main>
        <Container className="mt-12">
          <LogoCloud />
        </Container>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 pt-32">
          <FeatureSection />
          <BentoSection />
        </div>
        <DarkBentoSection />
      </main>
      {/* <Testimonials /> */}
      <Footer />
    </div>
  )
}
