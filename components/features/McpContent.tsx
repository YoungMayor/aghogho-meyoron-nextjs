/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { clientEnv } from '@/lib/env/client';
import Button from '@/components/ui/Button';

export default function McpContent() {
  const mcpUrl = `${clientEnv.NEXT_PUBLIC_APP_URL}/api/mcp`;

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-linear-to-b from-secondary/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-medium tracking-wider text-primary uppercase bg-primary/10 rounded-full">
            AI-Ready Portfolio
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Connect via <span className="text-primary">MCP</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            This portfolio is built with the <strong>Model Context Protocol (MCP)</strong>. You can
            now connect my professional data, career history, and projects directly to your AI
            agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#setup">
              <Button size="lg">How to Setup</Button>
            </Link>
            <Link href="/projects/portfolio-mcp-server">
              <Button variant="outline" size="lg">
                View Project Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Endpoint Bar */}
      <section className="py-8 px-4 border-y border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-background border border-border shadow-xs">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">MCP Endpoint URL</p>
              <code className="text-primary font-mono text-sm md:text-base break-all">
                {mcpUrl}
              </code>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (typeof navigator !== 'undefined') {
                  navigator.clipboard.writeText(mcpUrl);
                  alert('Copied to clipboard!');
                }
              }}
            >
              Copy URL
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="setup" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">What is MCP?</h2>
              <p className="text-muted-foreground mb-4">
                The Model Context Protocol (MCP) is an open standard that enables developers to
                build secure two-way connections between their data and AI tools.
              </p>

              <p className="text-muted-foreground mb-4">
                By implementing MCP, I've made it possible for your AI assistant to "browse" my
                portfolio, understand my tech stack, and even prepare interview questions based on
                my actual career history—all with minimal friction.
              </p>

              <div className="mt-10 p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Available Tools
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <code className="text-primary font-mono">get_profile</code>
                    <span className="text-muted-foreground">— Professional summary & bio</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="text-primary font-mono">list_projects</code>
                    <span className="text-muted-foreground">— Tech stacks & project links</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="text-primary font-mono">list_experience</code>
                    <span className="text-muted-foreground">— Detailed career history</span>
                  </li>
                  <li className="flex gap-2">
                    <code className="text-primary font-mono">send_message</code>
                    <span className="text-muted-foreground">— Reach out to me via AI</span>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">How to use</h2>
              <div className="space-y-8">
                {/* Claude Desktop */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">Claude Desktop</h3>
                  <div className="bg-secondary/30 p-4 rounded-xl border border-border">
                    <pre className="bg-background p-3 rounded-lg text-xs font-mono overflow-x-auto border border-border">
                      {`{
  "mcpServers": {
    "aghogho-portfolio": {
      "url": "${mcpUrl}"
    }
  }
}`}
                    </pre>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add the config to <code>claude_desktop_config.json</code> and restart.
                  </p>
                </div>

                {/* Cursor */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">Cursor IDE</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>
                      1. Go to <b>Settings</b> &gt; <b>Cursor Settings</b> &gt; <b>General</b> &gt;{' '}
                      <b>MCP</b>.
                    </p>
                    <p>
                      2. Click <b>+ Add New MCP Server</b>.
                    </p>
                    <p>
                      3. Name: <code>Aghogho Portfolio</code>.
                    </p>
                    <p>
                      4. Type: <code>http</code>.
                    </p>
                    <p>
                      5. URL: <code>${mcpUrl}</code>.
                    </p>
                  </div>
                </div>

                {/* Windsurf */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">Windsurf</h3>
                  <p className="text-sm text-muted-foreground">
                    Open <b>Settings</b> &gt; <b>MCP</b>, add a new server with the type <b>SSE</b>{' '}
                    and the URL provided above.
                  </p>
                </div>

                {/* VS Code */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">VS Code</h3>
                  <p className="text-sm text-muted-foreground">
                    Use extensions like <b>Roo Code</b> (formerly Claude Dev) or <b>MCP Client</b>.
                    Add an HTTP/SSE server using the endpoint URL.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to talk?</h2>
            <p className="text-muted-foreground mb-8">
              You can also use the traditional contact form if you prefer.
            </p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Go to Contact Page
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
