---
title: Who Wants To Be A Millionaire?
date: '2024-04-01'
---

# Who Wants To Be A Millionaire: The AI Edition

Recreating a classic game show is one thing; recreating the _tension_ is another. **WWTBAM AI Edition** uses artificial intelligence to act not just as a question generator, but as a host. It builds suspense, offers commentary, and reacts to your decisions, bringing the TV studio experience to your browser.

## Engineering the "Host"

The project's crown jewel is the **AI Host Persona**.

- **Contextual Commentary**: The Host doesn't just read questions. Using a state machine coupled with the Gemini API, the Host comments on the difficulty of the question, reacts to your lifeline usage ("Ooh, asking the audience, risky/smart move..."), and builds tension before revealing the answer.
- **Procedural Difficulty Curve**: Most trivia APIs are random. I engineered a difficulty curve that aligns with the game's money ladder. Question 1 is easy; Question 15 is brutal. The AI generates questions with specific "difficulty tokens" to ensure this progression feels fair and authentic.
- **State Management**: The game logic is a complex finite state machine (FSM) handling "Waiting for Answer", "Host Monologue", "Lifeline Active", and "Win/Loss" states, ensuring the UI never desyncs from the game flow.

## Key Features

- **Fully Voiced AI Host**: (Planned/Implemented text-to-speech integration) for immersive audio.
- **Authentic Lifelines**: "50:50" (AI removes two wrong answers intelligently), "Phone a Friend" (AI simulates a friend's uncertain guess).
- **High-Fidelity UI**: Closely mimics the broadcast graphics and animations.

## Immersion

This project pushes the boundaries of what a web game can be. It’s not just a quiz; it’s an interactive, AI-directed performance.
