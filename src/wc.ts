// Project Structure:
//
// src/
//   wc.ts         - Core functionality for counting
//   cli.ts        - Command-line interface
//   index.ts      - Main entry point
// tests/
//   wc.test.ts    - Tests for core library
//   cli.test.ts   - Tests for CLI
// package.json    - Project configuration
// tsconfig.json   - TypeScript configuration

// ------------------- src/wc.ts -------------------

/**
 * Results from processing a file with the wc tool
 */
export interface WcResult {
  bytes: number;
  lines: number;
  words: number;
  chars: number;
}

/**
 * Count the number of bytes in a buffer
 */
export function countBytes(content: Buffer): number {
  return content.length;
}

/**
 * Count the number of lines in a text
 * A line is counted for each newline character
 */
export function countLines(text: string): number {
  return (text.match(/\n/g) || []).length;
}

/**
 * Count the number of words in a text
 * Words are separated by whitespace
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Count the number of characters in a text
 * This counts Unicode code points, not just bytes
 */
export function countChars(text: string): number {
  return [...text].length;
}

/**
 * Process a file buffer and return counts
 */
export function wcFile(content: Buffer): WcResult {
  const textContent = content.toString('utf-8');

  return {
    bytes: countBytes(content),
    lines: countLines(textContent),
    words: countWords(textContent),
    chars: countChars(textContent)
  };
}
