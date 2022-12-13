import { readFileSync } from 'fs';
import { day13_1, day13_2 } from './day13';

const sample = readFileSync('day13/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day13/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 13: Distress Signal', () => {
    test('Part 1, example 1', () => {
        expect(day13_1(sample)).toBe(13);
    });

    test('Part 1, puzzle input', () => {
        expect(day13_1(input)).toBe(6072);
    });

    test('Part 2, example 1', () => {
        expect(day13_2(sample)).toBe(140);
    });

    test('Part 2, puzzle input', () => {
        expect(day13_2(input)).toBe(22184);
    });
});
