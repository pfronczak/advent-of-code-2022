import { readFileSync } from 'fs';
import { day10_1, day10_2 } from './day10';

const sample = readFileSync('day10/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const sample2 = readFileSync('day10/sample2.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day10/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 10: Cathode-Ray Tube', () => {
    test('Part 1, debug', () => {
        expect(day10_1(sample)).toBe(0);
    });

    test('Part 1, example 1', () => {
        expect(day10_1(sample2)).toBe(13140);
    });

    test('Part 1, puzzle input', () => {
        expect(day10_1(input)).toBe(13820);
    });

    test('Part 2, example 1', () => {
        day10_2(sample2);
    });

    test('Part 2, puzzle input', () => {
        day10_2(input);
    });
});
