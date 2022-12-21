import { readFileSync } from 'fs';
import { day17_1, day17_2 } from './day17';

const sample = readFileSync('day17/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day17/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day', () => {
    test('Part 1, example 1', () => {
        expect(day17_1(sample)).toBe(3068);
    });

    test('Part 1, puzzle input', () => {
        expect(day17_1(input)).toBe(3124);
    });

    test('Part 2, example 1', () => {
        expect(day17_2(sample)).toBe(1514285714288);
    });

    test('Part 2, puzzle input', () => {
        expect(day17_2(input)).toBe(0);
    });
});
