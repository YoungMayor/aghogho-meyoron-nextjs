---
title: iJokes
date: '2024-03-20'
---

# iJokes: Cross-Platform Humor Deployment

**iJokes** is more than just a joke app; it’s a study in multi-interface deployment. I built it to demonstrate how a single logic layer can power multiple user experiences. Whether accessing it via a responsive Next.js web app or interacting with the Telegram bot, users get a seamless, synchronized experience.

## The Architecture

The core challenge was **unification**. I didn't want to build two separate backends.

- **Headless Core**: I built a unified API layer that fetches, categorizes, and serves jokes. This core logic is agnostic to the frontend.
- **Telegram Bot Integration**: Using webhooks, I connected a Telegram bot to this same backend. The bot doesn't "know" jokes; it simply asks the API for them, ensuring that the content is always consistent across platforms.
- **Serverless Deployment**: Hosted on Cloudflare Workers, the backend is distributed globally, ensuring low-latency responses whether the request comes from a browser in London or a Telegram client in Lagos.

## Key Features

- **Dual Interface**: Web App & Telegram Bot.
- **Category Filtering**: Users can request specific types of humor (Programming, General, Knock-Knock).
- **Rate Limiting**: Custom logic to prevent API abuse while keeping the service free.

## Why It's Cool

iJokes shows that "write once, deploy everywhere" isn't just about UI frameworks—it's about backend architecture. It proves the power of decoupling data from presentation.
