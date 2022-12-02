import { readFileSync } from 'fs';
import { day1_1, day1_2 } from './day1';

const sample = readFileSync('day01/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day01/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 1: Calorie Counting', () => {
    test('Part 1, example 1', () => {
        expect(day1_1(sample)).toBe(24000);
    });

    test('Part 1, puzzle input', () => {
        expect(day1_1(input)).toBe(69795);
    });

    test('Part 2, example 1', () => {
        expect(day1_2(sample)).toBe(45000);
    });

    test('Part 2, puzzle input', () => {
        expect(day1_2(input)).toBe(208437);
    });
});
