import { readFileSync } from 'fs';
import { day9_1, day9_2 } from './day9';

const sample = readFileSync('day09/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const sample2 = readFileSync('day09/sample2.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day09/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 9: Rope Bridge', () => {
    test('Part 1, example 1', () => {
        expect(day9_1(sample)).toBe(13);
    });

    test('Part 1, puzzle input', () => {
        expect(day9_1(input)).toBe(6271);
    });

    test('Part 2, example 1', () => {
        expect(day9_2(sample)).toBe(1);
    });

    test('Part 2, example 2', () => {
        expect(day9_2(sample2)).toBe(36);
    });

    test('Part 2, puzzle input', () => {
        expect(day9_2(input)).toBe(2458);
    });
});
