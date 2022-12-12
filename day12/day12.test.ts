import { readFileSync } from 'fs';
import { day12_1, day12_2 } from './day12';

const sample = readFileSync('day12/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day12/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 12: Hill Climbing Algorithm', () => {
    test('Part 1, example 1', () => {
        expect(day12_1(sample)).toBe(31);
    });

    test('Part 1, puzzle input', () => {
        expect(day12_1(input)).toBe(425);
    });

    test('Part 2, example 1', () => {
        expect(day12_2(sample)).toBe(29);
    });

    test('Part 2, puzzle input', () => {
        expect(day12_2(input)).toBe(0);
    });
});
