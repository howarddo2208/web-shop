/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import('./env.mjs'))

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['images.unsplash.com'] },
  experimental: {
    appDir: true,
    serverActions: true,
  },
}

export default nextConfig
