import {
    getBasenameAddress,
    Basename
} from '@/apis/basenames';

async function fetchAddress(basename: Basename) {
    const addressRes = await getBasenameAddress(basename);
    return {
        basename,
        addressRes,
    };
}

export default async function Home() {
    const data = await fetchAddress("start3.base.eth");

    return (
        <main className='flex min-h-screen flex-col gap-12 p-24 text-black'>
            <span>Address Resolved</span>
            <strong>{data.addressRes}</strong>
        </main>
    );
}