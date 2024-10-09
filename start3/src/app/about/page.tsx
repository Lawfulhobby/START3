import { AnimatedNumber } from '@/components/animated-number'
import { Button } from '@/components/button'
import { Container } from '@/components/container'
import { Footer } from '@/components/footer'
import { GradientBackground } from '@/components/gradient'
import { Navbar } from '@/components/navbar'
import { Heading, Lead, Subheading } from '@/components/text'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Start3',
  description:
    'Start3 is on a mission to onboard the next billion users into Web3 through AI-driven, user-friendly onboarding flows.',
}

function Header() {
  return (
    <Container className="mt-16">
      <Heading as="h1">Onboarding the Next Billion Users into Web3</Heading>
      <Lead className="mt-6 max-w-3xl">
        Start3 is dedicated to simplifying the Web3 experience, guiding users seamlessly into the decentralized future.
      </Lead>
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-lg">
          <h2 className="text-2xl font-medium text-neutral-400 tracking-tight">Our Mission</h2>
          <p className="mt-6 text-sm/6 text-gray-600">
            At Start3, we aim to bring the next billion users on-chain by making Web3 accessible, secure, and rewarding.
            Our mission is to simplify the complexities of blockchain technology through AI-driven, personalized onboarding experiences.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            We believe in empowering individuals and organizations worldwide to seamlessly enter the decentralized space.
            By providing interactive learning modules, secure wallet creation, and incentive-driven participation,
            Start3 ensures that anyone can navigate the world of Web3 with confidence.
          </p>
        </div>
        <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
          <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <Image
                alt="Start3 Team"
                src="https://images.unsplash.com/photo-1589707197624-27802d81f462?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="block size-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <Image
                alt="Blockchain Technology"
                src="https://images.unsplash.com/photo-1562964400-f8ec1ef25777?q=80&w=3311&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="block size-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
              <Image
                alt="AI-Powered Onboarding"
                src="https://images.unsplash.com/photo-1515658323406-25d61c141a6e?q=80&w=3001&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="block size-full object-cover"
                width={500}
                height={500}
              />
            </div>
            <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
              <Image
                alt="Web3 Community"
                src="https://images.unsplash.com/photo-1497271679421-ce9c3d6a31da?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="block size-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        <div className="max-lg:mt-16 lg:col-span-1">
          {/* <Subheading>The Numbers</Subheading>
          <hr className="mt-6 border-t border-gray-200" />
          <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Users Onboarded</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={0} end={1} decimals={1} />M
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
              <dt className="text-sm/6 text-gray-600">Wallets Created</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={0} end={500} />K
              </dd>
            </div>
            <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
              <dt className="text-sm/6 text-gray-600">Flows Completed</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={0} end={2} decimals={1} />M
              </dd>
            </div>
            <div className="flex flex-col gap-y-2">
              <dt className="text-sm/6 text-gray-600">Partners Worldwide</dt>
              <dd className="order-first text-6xl font-medium tracking-tight">
                <AnimatedNumber start={0} end={100} />+
              </dd>
            </div>
          </dl> */}
        </div>
      </section>
    </Container>
  )
}

function Person({
  name,
  description,
  img,
}: {
  name: string
  description: string
  img: string
}) {
  return (
    <li className="flex items-center gap-4">
      <img alt="" src={img} className="size-12 rounded-full" />
      <div className="text-sm/6">
        <h3 className="font-medium">{name}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </li>
  )
}

function Team() {
  return (
    <Container className="mt-32">
      <Subheading>Meet the Team</Subheading>
      <Heading as="h3" className="mt-2">
        Founded by innovators in Web3.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        Start3 is built by a passionate team dedicated to making Web3 accessible to everyone.
      </Lead>
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="max-w-lg">
          <p className="text-sm/6 text-gray-600">
            Our founders recognized the barriers that prevented people from engaging with decentralized technologies.
            With backgrounds in blockchain development, AI, and user experience design, they came together to create a platform that simplifies the complexities of Web3.
          </p>
          <p className="mt-8 text-sm/6 text-gray-600">
            Today, Start3 aims to empower users around the globe to seamlessly enter the world of decentralized applications, DeFi, NFTs, and more.
            Our team is committed to continuous innovation, ensuring that Web3 is accessible, secure, and rewarding for all.
          </p>
          {/* <div className="mt-6">
            <Button className="w-full sm:w-auto" href="/careers">
              Join us
            </Button>
          </div> */}
        </div>
        <div className="max-lg:order-first max-lg:max-w-lg">
          <div className="aspect-[3/2] overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
            <Image
              alt="Start3 Team"
              src="https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="block size-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
      {/* <Subheading as="h3" className="mt-24">
        The Team
      </Subheading>
      <hr className="mt-6 border-t border-gray-200" />
      <ul
        role="list"
        className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Person
          name="Alex Johnson"
          description="Co-Founder / CEO"
          img="/team/alex-johnson.jpg"
        />
        <Person
          name="Samantha Lee"
          description="Co-Founder / CTO"
          img="/team/samantha-lee.jpg"
        />
        <Person
          name="Michael Chen"
          description="Lead Blockchain Developer"
          img="/team/michael-chen.jpg"
        />
        <Person
          name="Emily Davis"
          description="Head of Design"
          img="/team/emily-davis.jpg"
        />
        <Person
          name="Daniel Martinez"
          description="AI Engineer"
          img="/team/daniel-martinez.jpg"
        />
        <Person
          name="Lisa Patel"
          description="Community Manager"
          img="/team/lisa-patel.jpg"
        />
        <Person
          name="Kevin Nguyen"
          description="Front-end Developer"
          img="/team/kevin-nguyen.jpg"
        />
        <Person
          name="Sophia Rodriguez"
          description="UX Researcher"
          img="/team/sophia-rodriguez.jpg"
        />
        <Person
          name="James Kim"
          description="Marketing Lead"
          img="/team/james-kim.jpg"
        />
      </ul> */}
    </Container>
  )
}

function Investors() {
  return (
    <Container className="mt-32">
      <Subheading>Investors</Subheading>
      <Heading as="h3" className="mt-2">
        Backed by visionaries in the industry.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        We are fortunate to be supported by leading investors who believe in our mission to onboard the next billion users into Web3.
      </Lead>
      <Subheading as="h3" className="mt-24">
        Venture Capital
      </Subheading>
      <hr className="mt-6 border-t border-gray-200" />
      <ul
        role="list"
        className="mx-auto mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <li>
          <img
            alt="Blockchain Ventures"
            src="/investors/blockchain-ventures.svg"
            className="h-14"
          />
          <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
            Blockchain Ventures is a pioneer in the blockchain investment space, supporting innovative projects that are shaping the future of decentralized technology. Their expertise and network have been invaluable in accelerating Start3's growth and outreach.
          </p>
        </li>
        <li>
          <img alt="FutureTech Capital" src="/investors/futuretech-capital.svg" className="h-14" />
          <p className="mt-6 max-w-lg text-sm/6 text-gray-500">
            FutureTech Capital invests in transformative technologies that have the potential to redefine industries. Their commitment to fostering innovation aligns perfectly with Start3's vision of democratizing access to Web3.
          </p>
        </li>
      </ul>
      <Subheading as="h3" className="mt-24">
        Individual Investors
      </Subheading>
      <hr className="mt-6 border-t border-gray-200" />
      <ul
        role="list"
        className="mx-auto mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <Person
          name="Olivia Brown"
          description="Tech Innovator"
          img="/individual-investors/olivia-brown.jpg"
        />
        <Person
          name="Ethan Wilson"
          description="Blockchain Enthusiast"
          img="/individual-investors/ethan-wilson.jpg"
        />
        <Person
          name="Mia Garcia"
          description="Angel Investor"
          img="/individual-investors/mia-garcia.jpg"
        />
        <Person
          name="Liam Anderson"
          description="Entrepreneur"
          img="/individual-investors/liam-anderson.jpg"
        />
        <Person
          name="Sophia Martinez"
          description="Crypto Advisor"
          img="/individual-investors/sophia-martinez.jpg"
        />
        <Person
          name="Noah Thompson"
          description="Tech Visionary"
          img="/individual-investors/noah-thompson.jpg"
        />
      </ul>
    </Container>
  )
}

function Testimonial() {
  return (
    <div className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[3/4]">
      <img
        alt="Testimonial from Ava Patel"
        src="/testimonials/ava-patel.jpg"
        className="absolute inset-0 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black from-10% to-75% ring-1 ring-inset ring-gray-950/10 lg:from-25%"
      />
      <figure className="relative p-10">
        <blockquote>
          <p className="relative text-xl/7 text-white before:absolute before:-translate-x-full before:content-['“'] after:absolute after:content-['”']">
            Start3 made entering the world of Web3 effortless. Their guided flows helped me create my first wallet and explore decentralized applications confidently.
          </p>
        </blockquote>
        <figcaption className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm/6 font-medium text-white">Ava Patel</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-[#fff1be] from-[28%] via-[#ee87cb] via-[70%] to-[#b060ff] bg-clip-text text-transparent">
              CEO, TechNova
            </span>
          </p>
        </figcaption>
      </figure>
    </div>
  )
}

function Careers() {
  return (
    <Container className="my-32">
      <Subheading>Careers</Subheading>
      <Heading as="h3" className="mt-2">
        Join our growing team.
      </Heading>
      <Lead className="mt-6 max-w-3xl">
        We are a fully remote team committed to making Web3 accessible to everyone. Come be a part of our mission.
      </Lead>
      <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_24rem]">
        <div className="lg:max-w-2xl">
          <Subheading as="h3">Open Positions</Subheading>
          <div>
            <table className="w-full text-left">
              <colgroup>
                <col className="w-2/3" />
                <col className="w-1/3" />
                <col className="w-0" />
              </colgroup>
              <thead className="sr-only">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Read more</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="colgroup" colSpan={3} className="px-0 pb-0 pt-10">
                    <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
                      Engineering
                    </div>
                  </th>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">Blockchain Developer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="/careers/blockchain-developer">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">Front-end Engineer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="/careers/front-end-engineer">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="text-sm/6 font-normal">
                  <td className="px-0 py-4">AI/ML Engineer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="/careers/ai-ml-engineer">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr>
                  <th scope="colgroup" colSpan={3} className="px-0 pb-0 pt-5">
                    <div className="-mx-4 rounded-lg bg-gray-50 px-4 py-3 text-sm/6 font-semibold">
                      Design
                    </div>
                  </th>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">UX/UI Designer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="/careers/ux-ui-designer">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="border-b border-dotted border-gray-200 text-sm/6 font-normal">
                  <td className="px-0 py-4">Graphic Designer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="/careers/graphic-designer">
                      View listing
                    </Button>
                  </td>
                </tr>
                <tr className="text-sm/6 font-normal">
                  <td className="px-0 py-4">Product Designer</td>
                  <td className="px-0 py-4 text-gray-600">Remote</td>
                  <td className="px-0 py-4 text-right">
                    <Button variant="outline" href="/careers/product-designer">
                      View listing
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Testimonial />
      </div>
    </Container>
  )
}

export default function Company() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar />
      </Container>
      <Header />
      <Team />
      {/* <Investors />
      <Careers /> */}
      <Footer />
    </main>
  )
}