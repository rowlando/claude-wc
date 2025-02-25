Here's Claude 3.7's one-shot attempt at the [WC challenge](https://codingchallenges.fyi/challenges/challenge-wc/). Here's [the prompt](prompt.md) I fed into Claude.

---

# ccwc - Word Count Tool

A TypeScript implementation of the Unix `wc` command, following Unix philosophy principles.

## Features

- Count bytes in a file (`-c` option)
- Count lines in a file (`-l` option)
- Count words in a file (`-w` option)
- Count characters in a file (`-m` option)
- Default behavior equivalent to `-c -l -w`
- Support for reading from standard input
- Support for multiple files

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
# Count bytes
npx ccwc -c test.txt

# Count lines
npx ccwc -l test.txt

# Count words
npx ccwc -w test.txt

# Count characters
npx ccwc -m test.txt

# Default behavior (bytes, lines, and words)
npx ccwc test.txt

# Reading from stdin
cat test.txt | npx ccwc
```

## Development

```bash
# Run tests
npm test
```
