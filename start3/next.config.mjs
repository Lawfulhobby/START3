// // next.config.mjs

// import { createRequire } from 'module'
// import webpack from 'webpack'

// const require = createRequire(import.meta.url)

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         encoding: require.resolve('encoding'),
//         'pino-pretty': require.resolve('pino-pretty'),
//       }
//     }

//     return config
//   },
// }

// export default nextConfig

/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ["images.unsplash.com", "assets.aceternity.com", "lh3.googleusercontent.com", "s3.us-west-2.amazonaws.com", "https:/i.pravatar.cc", "i.pravatar.cc"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    output: "standalone",
};

export default nextConfig
