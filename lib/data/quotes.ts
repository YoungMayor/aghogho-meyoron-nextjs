export interface TechQuote {
  text: string;
  author: string;
}

export const techQuotes: TechQuote[] = [
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler',
  },
  {
    text: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson',
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: 'Cory House',
  },
  {
    text: 'Make it work, make it right, make it fast.',
    author: 'Kent Beck',
  },
  {
    text: 'Clean code always looks like it was written by someone who cares.',
    author: 'Robert C. Martin',
  },
  {
    text: "Programming isn't about what you know; it's about what you can figure out.",
    author: 'Chris Pine',
  },
  {
    text: 'The best error message is the one that never shows up.',
    author: 'Thomas Fuchs',
  },
  {
    text: 'Simplicity is the soul of efficiency.',
    author: 'Austin Freeman',
  },
  {
    text: 'Before software can be reusable it first has to be usable.',
    author: 'Ralph Johnson',
  },
  {
    text: 'The only way to go fast is to go well.',
    author: 'Robert C. Martin',
  },
];

/**
 * Get a random tech quote from the collection
 */
export function getRandomQuote(): TechQuote {
  const randomIndex = Math.floor(Math.random() * techQuotes.length);
  return techQuotes[randomIndex];
}
