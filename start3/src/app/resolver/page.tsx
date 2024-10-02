// // app/resolver/page.tsx
// 'use client';

// import { useState } from 'react';
// import { ethers, Provider, Constant } from 'ethers';

// export default function ResolverPage() {
//   const [basename, setBasename] = useState('');
//   const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   const resolveBasename = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setLoading(true);
//     setResolvedAddress(null);
//     setError(null);

//     try {
//       // Validate Basename input
//       if (!basename.endsWith('.eth')) {
//         throw new Error('Basename must end with .eth');
//       }

//       // Compute namehash
//       const namehash = ethers.utils.namehash(basename);
      
//       // ENS Registry Address (Ethereum Mainnet)
//       const ensRegistryAddress = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';

//       // ABI fragment for resolver function
//       const ensRegistryAbi = [
//         'function resolver(bytes32 node) external view returns (address)',
//       ];

//       // Initialize provider (using Infura)
//       const provider = new ethers.providers.InfuraProvider('mainnet', process.env.NEXT_PUBLIC_INFURA_PROJECT_ID);

//       // Create ENS Registry Contract Instance
//       const ensRegistry = new ethers.Contract(ensRegistryAddress, ensRegistryAbi, provider);

//       // Get Resolver Address
//       const resolverAddress = await ensRegistry.resolver(namehash);

//       if (resolverAddress === ethers.constants.AddressZero) {
//         throw new Error('Resolver not set for this Basename.');
//       }

//       // ABI fragment for addr function
//       const resolverAbi = [
//         'function addr(bytes32 node) external view returns (address)',
//       ];

//       // Create Resolver Contract Instance
//       const resolverContract = new ethers.Contract(resolverAddress, resolverAbi, provider);

//       // Get Ethereum Address
//       const ethAddress: string = await resolverContract.addr(namehash);

//       if (ethAddress === ethers.constants.AddressZero) {
//         throw new Error('No address set for this Basename.');
//       }

//       setResolvedAddress(ethAddress);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold mb-6 text-center">Basename Resolver</h1>
//         <form onSubmit={resolveBasename} className="space-y-4">
//           <div>
//             <label htmlFor="basename" className="block text-sm font-medium text-gray-700">
//               Enter Basename (e.g., example.basename.eth)
//             </label>
//             <input
//               type="text"
//               id="basename"
//               name="basename"
//               value={basename}
//               onChange={(e) => setBasename(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               placeholder="example.basename.eth"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//               loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
//             disabled={loading}
//           >
//             {loading ? 'Resolving...' : 'Resolve Address'}
//           </button>
//         </form>

//         {resolvedAddress && (
//           <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
//             <p><span className="font-semibold">Resolved Address:</span> {resolvedAddress}</p>
//           </div>
//         )}

//         {error && (
//           <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             <p><span className="font-semibold">Error:</span> {error}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }