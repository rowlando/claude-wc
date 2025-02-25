#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { wcFile } from './wc';

/**
 * Options for the wc command
 */
export interface Options {
  countBytes: boolean;
  countLines: boolean;
  countWords: boolean;
  countChars: boolean;
}

/**
 * Parse command line arguments
 */
export function parseArgs(args: string[]): { options: Options, files: string[] } {
  const options: Options = {
    countBytes: false,
    countLines: false,
    countWords: false,
    countChars: false
  };

  const files: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('-')) {
      // Handle option flags
      if (arg === '-c') {
        options.countBytes = true;
      } else if (arg === '-l') {
        options.countLines = true;
      } else if (arg === '-w') {
        options.countWords = true;
      } else if (arg === '-m') {
        options.countChars = true;
      } else {
        // Handle combined flags (e.g., -lwc)
        for (let j = 1; j < arg.length; j++) {
          const flag = arg[j];
          if (flag === 'c') {
            options.countBytes = true;
          } else if (flag === 'l') {
            options.countLines = true;
          } else if (flag === 'w') {
            options.countWords = true;
          } else if (flag === 'm') {
            options.countChars = true;
          } else {
            console.error(`Unknown option: ${flag}`);
            process.exit(1);
          }
        }
      }
    } else {
      // It's a filename
      files.push(arg);
    }
  }

  // If no options are specified, use default behavior (equivalent to -c -l -w)
  const anyOptionSpecified = Object.values(options).some(value => value);
  if (!anyOptionSpecified) {
    options.countBytes = true;
    options.countLines = true;
    options.countWords = true;
  }

  return { options, files };
}

/**
 * Process a file and return formatted output
 */
export async function processFile(filePath: string, options: Options): Promise<string> {
  try {
    const content = await fs.promises.readFile(filePath);
    const result = wcFile(content);

    let output = '';

    if (options.countLines) {
      output += `${result.lines.toString().padStart(8)} `;
    }

    if (options.countWords) {
      output += `${result.words.toString().padStart(8)} `;
    }

    if (options.countBytes) {
      output += `${result.bytes.toString().padStart(8)} `;
    }

    if (options.countChars) {
      output += `${result.chars.toString().padStart(8)} `;
    }

    output += filePath;

    return output;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${(error as Error).message}`);
    process.exit(1);
  }
}

/**
 * Process input from stdin
 */
export async function processStdin(options: Options): Promise<string> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];

    process.stdin.on('data', (chunk) => {
      chunks.push(Buffer.from(chunk));
    });

    process.stdin.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const result = wcFile(buffer);

      let output = '';

      if (options.countLines) {
        output += `${result.lines.toString().padStart(8)} `;
      }

      if (options.countWords) {
        output += `${result.words.toString().padStart(8)} `;
      }

      if (options.countBytes) {
        output += `${result.bytes.toString().padStart(8)} `;
      }

      if (options.countChars) {
        output += `${result.chars.toString().padStart(8)} `;
      }

      resolve(output);
    });
  });
}

/**
 * Main entry point for the CLI
 */
export async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2); // Remove 'node' and script name
    const { options, files } = parseArgs(args);

    if (files.length === 0) {
      // Read from stdin if no files specified
      const output = await processStdin(options);
      console.log(output);
    } else {
      // Process each file
      for (const file of files) {
        const output = await processFile(file, options);
        console.log(output);
      }
    }
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Run the CLI if this is the main module
if (require.main === module) {
  main().catch((error) => {
    console.error(`Unhandled error: ${(error as Error).message}`);
    process.exit(1);
  });
}
