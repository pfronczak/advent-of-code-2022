import { readFileSync } from 'fs';
import { day4_1, day4_2 } from './day4';

const sample = readFileSync('day04/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day04/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 4: Camp Cleanup', () => {
    test('Part 1, example 1', () => {
        expect(day4_1(sample)).toBe(2);
    });

    test('Part 1, puzzle input', () => {
        expect(day4_1(input)).toBe(424);
    });

    test('Part 2, example 1', () => {
        expect(day4_2(sample)).toBe(4);
    });

    test('Part 2, puzzle input', () => {
        expect(day4_2(input)).toBe(804);
    });
});
