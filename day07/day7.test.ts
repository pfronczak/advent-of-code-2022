import { readFileSync } from 'fs';
import console from 'console';
import { day7_1, day7_2 } from './day7';

global.console = console;

const sample = readFileSync('day07/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day07/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 7: No Space Left On Device', () => {
    test('Part 1, example 1', () => {
        expect(day7_1(sample)).toBe(95437);
    });

    test('Part 1, puzzle input', () => {
        expect(day7_1(input)).toBe(1306611);
    });

    test('Part 2, example 1', () => {
        expect(day7_2(sample)).toBe(24933642);
    });

    test('Part 2, puzzle input', () => {
        expect(day7_2(input)).toBe(13210366);
    });
});
