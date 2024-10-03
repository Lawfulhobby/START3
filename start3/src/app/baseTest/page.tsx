import {
    BasenameTextRecordKeys,
    getBasename,
    getBasenameAddress,
    getBasenameAvatar,
    getBasenameTextRecord,
  } from '@/apis/basenames';
//   import BasenameDetails from '@/components/BasenameDetails';
//   import EthereumProviders from '@/contexts/EthereumProviders';
  import { useAccount } from 'wagmi';
  
  // shrek.base.eth
  
  const address = '0x9A5EE70c75737dE6c20960695eb26DfEF6e767b1'; // const account = useAccount(); \n address = account?.address;
  
  async function fetchData() {
    const basename = await getBasename(address);
  
    if (basename === undefined) throw Error('failed to resolve address to name');
  
    const avatar = await getBasenameAvatar(basename);

    const addressRes = await getBasenameAddress("blssngx.base.eth");
  
    const description = await getBasenameTextRecord(
      basename,
      BasenameTextRecordKeys.Description
    );
  
    const twitter = await getBasenameTextRecord(
      basename,
      BasenameTextRecordKeys.Twitter
    );
  
    return {
      basename,
      avatar,
      description,
      twitter,
      addressRes,
    };
  }
  
  export default async function Home() {
    const data = await fetchData();
  
    return (
    //   <EthereumProviders>
        <main className='flex min-h-screen flex-col gap-12 p-24 text-black'>
          <div className='mb-12'>
            <h1 className='text-xl mb-4'>Server-side rendered:</h1>
            <ul className='flex flex-col gap-4'>
              <li className='flex flex-col gap-2'>
                <span>Address</span>
                <strong>{address}</strong>
              </li>
              <li className='flex flex-col gap-2'>
                <span>Basename</span>
                <strong>{data.basename}</strong>
              </li>
              {/* <li className='flex flex-col gap-2'>
                <span>Avatar</span>
                <strong>
                  <img
                    src={data.avatar || ""}
                    alt={data.basename}
                    width={100}
                    height={100}
                  />
                </strong>
              </li> */}
              <li className='flex flex-col gap-2'>
                <span>Description</span>
                <strong>{data.description}</strong>
              </li>
              <li className='flex flex-col gap-2'>
                <span>Address Resolved</span>
                <strong>{data.addressRes}</strong>
              </li>
            </ul>
          </div>
          <div>
            {/* <h1 className='text-xl mb-4'>Client-side rendered:</h1> */}
            {/* <BasenameDetails address={address} /> */}
          </div>
        </main>
    //   </EthereumProviders>
    );
  }