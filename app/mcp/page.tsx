import { Metadata } from 'next';
import McpContent from '@/components/features/McpContent';

export const metadata: Metadata = {
  title: 'AI-Ready Portfolio | Model Context Protocol',
  description: 'Connect my portfolio to your AI agents using the Model Context Protocol (MCP).',
};

export default function McpPage() {
  return <McpContent />;
}
