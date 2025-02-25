
import { wcFile, countBytes, countLines, countWords, countChars } from '../src/wc';

describe('Word Count Library', () => {
  test('countBytes returns correct byte count', () => {
    const buffer = Buffer.from('hello\nworld');
    expect(countBytes(buffer)).toBe(11);
  });

  test('countLines returns correct line count', () => {
    expect(countLines('hello\nworld')).toBe(1);
    expect(countLines('hello\nworld\n')).toBe(2);
    expect(countLines('')).toBe(0);
  });

  test('countWords returns correct word count', () => {
    expect(countWords('hello world')).toBe(2);
    expect(countWords('  hello   world  ')).toBe(2);
    expect(countWords('')).toBe(0);
  });

  test('countChars returns correct character count', () => {
    expect(countChars('hello\nworld')).toBe(11);
    expect(countChars('😊')).toBe(1); // Emoji is a single character
    expect(countChars('')).toBe(0);
  });

  test('wcFile returns correct counts', () => {
    const buffer = Buffer.from('hello\nworld');
    const result = wcFile(buffer);

    expect(result.bytes).toBe(11);
    expect(result.lines).toBe(1);
    expect(result.words).toBe(2);
    expect(result.chars).toBe(11);
  });

  test('wcFile handles empty file', () => {
    const buffer = Buffer.from('');
    const result = wcFile(buffer);

    expect(result.bytes).toBe(0);
    expect(result.lines).toBe(0);
    expect(result.words).toBe(0);
    expect(result.chars).toBe(0);
  });

  test('wcFile handles multi-byte characters', () => {
    // Unicode characters occupy multiple bytes
    const buffer = Buffer.from('😊😊');
    const result = wcFile(buffer);

    expect(result.bytes).toBe(8); // 4 bytes per emoji
    expect(result.chars).toBe(2); // But only 2 characters
  });
});
