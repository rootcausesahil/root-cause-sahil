/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> outputs to /out, deployable directly to Cloudflare Pages.
  output: 'export',
  // Trailing slashes make every route a folder with an index.html, which is
  // what static hosts (Cloudflare Pages) expect for clean nested URLs.
  trailingSlash: true,
  // next/image's optimization API needs a server; static export has none.
  images: {
    unoptimized: true,
  },
  // On WSL2 (and Docker, network drives), native filesystem change events
  // don't always reach webpack's watcher, so edits silently stop
  // hot-reloading until the dev server is restarted. Polling for changes
  // instead of relying on OS-level events fixes that. Dev-only: `dev` is
  // false during `next build`, where watching doesn't apply anyway.
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
