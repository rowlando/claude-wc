
import { parseArgs, processFile } from '../src/cli';
import * as fs from 'fs';

// Mock fs.promises.readFile for testing
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

describe('Command Line Interface', () => {
  test('parseArgs handles default behavior correctly', () => {
    const { options, files } = parseArgs(['file.txt']);

    expect(options.countBytes).toBe(true);
    expect(options.countLines).toBe(true);
    expect(options.countWords).toBe(true);
    expect(options.countChars).toBe(false);
    expect(files).toEqual(['file.txt']);
  });

  test('parseArgs handles -c flag correctly', () => {
    const { options, files } = parseArgs(['-c', 'file.txt']);

    expect(options.countBytes).toBe(true);
    expect(options.countLines).toBe(false);
    expect(options.countWords).toBe(false);
    expect(options.countChars).toBe(false);
    expect(files).toEqual(['file.txt']);
  });

  test('parseArgs handles -l flag correctly', () => {
    const { options, files } = parseArgs(['-l', 'file.txt']);

    expect(options.countBytes).toBe(false);
    expect(options.countLines).toBe(true);
    expect(options.countWords).toBe(false);
    expect(options.countChars).toBe(false);
    expect(files).toEqual(['file.txt']);
  });

  test('parseArgs handles -w flag correctly', () => {
    const { options, files } = parseArgs(['-w', 'file.txt']);

    expect(options.countBytes).toBe(false);
    expect(options.countLines).toBe(false);
    expect(options.countWords).toBe(true);
    expect(options.countChars).toBe(false);
    expect(files).toEqual(['file.txt']);
  });

  test('parseArgs handles -m flag correctly', () => {
    const { options, files } = parseArgs(['-m', 'file.txt']);

    expect(options.countBytes).toBe(false);
    expect(options.countLines).toBe(false);
    expect(options.countWords).toBe(false);
    expect(options.countChars).toBe(true);
    expect(files).toEqual(['file.txt']);
  });

  test('parseArgs handles combined flags correctly', () => {
    const { options, files } = parseArgs(['-lwc', 'file.txt']);

    expect(options.countBytes).toBe(true);
    expect(options.countLines).toBe(true);
    expect(options.countWords).toBe(true);
    expect(options.countChars).toBe(false);
    expect(files).toEqual(['file.txt']);
  });

  test('parseArgs handles multiple files correctly', () => {
    const { options, files } = parseArgs(['-c', 'file1.txt', 'file2.txt']);

    expect(options.countBytes).toBe(true);
    expect(files).toEqual(['file1.txt', 'file2.txt']);
  });

  test('processFile formats output correctly', async () => {
    const mockFileContent = Buffer.from('hello\nworld');
    (fs.promises.readFile as jest.Mock).mockResolvedValue(mockFileContent);

    const options = {
      countBytes: true,
      countLines: true,
      countWords: true,
      countChars: false
    };

    const result = await processFile('test.txt', options);
    expect(result).toBe('       1        2       11 test.txt');
  });
});
