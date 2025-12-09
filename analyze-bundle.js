import bundleAnalyzer from '@next/bundle-analyzer';
import nextConfig from './next.config.ts';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
