/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    // Ignore .map files
    config.module.rules.push({
      test: /\.map$/,
      loader: 'ignore-loader'
    });

    // Ignore .d.ts files
    config.module.rules.push({
      test: /\.d\.ts$/,
      loader: 'ignore-loader'
    });
    
    return config;
  }
};

module.exports = nextConfig;
