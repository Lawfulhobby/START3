// // app/create-wallet/page.tsx
// // @ts-nocheck
// 'use client'

// import { useEffect, useState } from 'react'
// import { Wallet } from 'ethers'

// const CreateWalletModule = () => {
//   const [wallet, setWallet] = useState<Wallet | null>(null)
//   const [showPrivateKey, setShowPrivateKey] = useState<boolean>(false)
//   const [showSeedPhrase, setShowSeedPhrase] = useState<boolean>(false)

//   useEffect(() => {
//     const generateWallet = () => {
//       const newWallet = Wallet.createRandom()
//       setWallet(newWallet)
//     }

//     generateWallet()
//   }, [])

//   const togglePrivateKeyVisibility = () => {
//     setShowPrivateKey((prev) => !prev)
//   }

//   const toggleSeedPhraseVisibility = () => {
//     setShowSeedPhrase((prev) => !prev)
//   }

//   if (!wallet) {
//     return (
//       <div className="flex items-center justify-center ">
//         <p className="text-xl">Generating wallet...</p>
//       </div>
//     )
//   }

//   return (
//     <div className=" bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
//         <div className="space-y-4">
//           {/* Address */}
//           <div>
//             <h2 className="text-lg font-semibold text-neutral-500">Address</h2>
//             <p className="break-all text-neutral-500">{wallet.address}</p>
//           </div>

//           {/* Public Key */}
//           <div>
//             <h2 className="text-lg font-semibold text-neutral-500">Public Key</h2>
//             <p className="break-all text-neutral-500">{wallet.publicKey}</p>
//           </div>

//           {/* Private Key with Toggle */}
//           <div>
//             <h2 className="text-lg font-semibold flex items-center justify-between">
//               <span className='text-neutral-500'>Private Key</span>
//               <button
//                 onClick={togglePrivateKeyVisibility}
//                 className="text-sm text-blue-500 hover:underline focus:outline-none"
//               >
//                 {showPrivateKey ? 'Hide' : 'Show'}
//               </button>
//             </h2>
//             <p className="break-all">
//               {showPrivateKey ? (
//                 <span className="text-red-600">{wallet.privateKey}</span>
//               ) : (
//                 <span className="text-gray-400">•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••</span>
//               )}
//             </p>
//           </div>

//           {/* Seed Phrase with Toggle */}
//           <div>
//             <h2 className="text-lg font-semibold flex items-center justify-between">
//               <span className='text-neutral-500'>Seed Phrase</span>
//               <button
//                 onClick={toggleSeedPhraseVisibility}
//                 className="text-sm text-blue-500 hover:underline focus:outline-none"
//               >
//                 {showSeedPhrase ? 'Hide' : 'Show'}
//               </button>
//             </h2>
//             <p className="break-all">
//               {showSeedPhrase ? (
//                 <span className="text-yellow-600">{wallet.mnemonic?.phrase}</span>
//               ) : (
//                 <span className="text-gray-400">•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••</span>
//               )}
//             </p>
//           </div>
//         </div>
//         <div className="mt-6">
//           <p className="text-neutral-500">
//             <strong>Warning:</strong> Store your private key and seed phrase securely. Anyone with access to them can control your wallet.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CreateWalletPage