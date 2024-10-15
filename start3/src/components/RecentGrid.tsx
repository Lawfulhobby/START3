import React from "react";
import useSWR from 'swr'
import { PathFinderLoader } from "./loader";
import { Heading } from "./text";
import { WobbleCard } from "./ui/wobble-card";
import Link from "next/link";

// Define the fetcher function
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const RecentGrid = () => {
    const { data, error } = useSWR(`/api/GET/getFlows/0x06ad34ecdc7b2a212fc815eaf06e229e37297712`, fetcher);

    // Define a list of background colors with different colors at the 800 shade
    const bgColors = [
        'bg-red-800', 'bg-blue-800', 'bg-green-800', 'bg-yellow-800', 'bg-purple-800', 'bg-pink-800', 'bg-indigo-800', 'bg-teal-800', 'bg-orange-800', 'bg-gray-800',
        'bg-cyan-800', 'bg-amber-800', 'bg-lime-800', 'bg-rose-800', 'bg-fuchsia-800', 'bg-violet-800', 'bg-emerald-800', 'bg-sky-800', 'bg-slate-800', 'bg-stone-800',
        'bg-neutral-800', 'bg-zinc-800', 'bg-warmGray-800', 'bg-trueGray-800', 'bg-coolGray-800', 'bg-lightBlue-800', 'bg-deepOrange-800', 'bg-lightGreen-800', 'bg-blueGray-800', 'bg-deepPurple-800',
        'bg-turquoise-800', 'bg-charcoal-800', 'bg-burgundy-800', 'bg-maroon-800', 'bg-saffron-800', 'bg-coral-800', 'bg-ruby-800', 'bg-seaGreen-800', 'bg-forestGreen-800', 'bg-celeste-800',
        'bg-periwinkle-800', 'bg-lavender-800', 'bg-sienna-800', 'bg-copper-800', 'bg-bronze-800', 'bg-ash-800', 'bg-pomegranate-800', 'bg-eggplant-800', 'bg-moss-800', 'bg-peacock-800',
        'bg-mint-800', 'bg-plum-800', 'bg-jade-800', 'bg-caramel-800', 'bg-mustard-800', 'bg-sangria-800', 'bg-tangerine-800', 'bg-clay-800', 'bg-ochre-800', 'bg-basil-800',
        'bg-cobalt-800', 'bg-currant-800', 'bg-blush-800', 'bg-gold-800', 'bg-aqua-800', 'bg-lilac-800', 'bg-flamingo-800', 'bg-magenta-800', 'bg-rosewood-800', 'bg-ivory-800',
        'bg-mahogany-800', 'bg-ocean-800', 'bg-honey-800', 'bg-peach-800', 'bg-mango-800', 'bg-salmon-800', 'bg-firebrick-800', 'bg-amethyst-800', 'bg-topaz-800', 'bg-lapis-800',
        'bg-navy-800', 'bg-olive-800', 'bg-almond-800', 'bg-cinnamon-800', 'bg-cherry-800', 'bg-clover-800', 'bg-ebony-800', 'bg-flax-800', 'bg-garnet-800', 'bg-lemon-800',
        'bg-mocha-800', 'bg-onyx-800', 'bg-sapphire-800', 'bg-taupe-800', 'bg-ultramarine-800', 'bg-walnut-800', 'bg-yam-800', 'bg-zircon-800', 'bg-ivory-800', 'bg-turmeric-800'
    ];

    if (error) return <div>An error occurred.</div>;
    if (!data) return (
        <PathFinderLoader />
    );

    return (
        <div>
            <Heading as="h1">Recent</Heading>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4 mx-auto w-full">
                {data.flows.map((data: any, index: number) => {
                    // Get the background color based on the index (cycling through the colors)
                    const bgColor = bgColors[index % bgColors.length];

                    return (
                        <Link href={`/flow/${data.id}`}>
                            <WobbleCard
                                key={index} // Add a key prop for lists
                                containerClassName={`col-span-1 lg:col-span-1 h-full ${bgColor} min-h-[500px] lg:min-h-[300px]`}
                                className=""
                            >
                                <div className="max-w-xs">
                                    <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                                        {data.name}
                                    </h2>
                                    <p className="mt-4 text-left  text-base/6 text-neutral-200">
                                        {data.description}
                                    </p>
                                </div>
                            </WobbleCard>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};