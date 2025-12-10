---
title: QuizWise
date: '2024-03-01'
---

# QuizWise: The Infinite Trivia Engine

Traditional quiz apps run out of content. You play through the database, memorize the answers, and the fun ends. **QuizWise** is different. It is an infinite trivia engine powered by real-time generative AI. Every question is created on the fly, ensuring that no two game sessions are ever the same.

## Technical Innovation: Real-Time Generation

The biggest technical hurdle was **latency**. Generative AI can be slow, and a quiz game needs to be fast.

- **Optimized Streaming**: I utilized Next.js streaming responses to deliver the question structure to the client before the full text was even generated. This creates a perception of instant loading.
- **Pre-Fetch Logic**: While the user is answering Question 1, QuizWise is already silently generating Question 2 in the background. This "just-in-time" generation keeps the gameplay fluid and uninterrupted.
- **Structured Data Enforcement**: Using strict JSON schema validation with the Gemini API, I ensured that the AI always returns valid question objects (Question, Options, Answer), preventing UI crashes from malformed data.

## Key Features

- **Infinite Topics**: From "18th Century French Poetry" to "Quantum Computing," users can quiz themselves on literally anything.
- **Adaptive Difficulty**: The AI adjusts the complexity of questions based on the user's winning streak.
- **Instant Explanations**: When you get an answer wrong, QuizWise doesn't just say "Incorrect"—it explains _why_, turning every mistake into a learning moment.

## The Experience

QuizWise is more than a game; it's a test of the AI's ability to be creative within strict constraints. It showcases the potential of generative content to keep users engaged indefinitely.
