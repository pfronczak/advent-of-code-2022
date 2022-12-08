import { readFileSync } from 'fs';
import { day8_1, day8_2 } from './day8';

const sample = readFileSync('day08/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day08/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 8: Treetop Tree House', () => {
    test('Part 1, example 1', () => {
        expect(day8_1(sample)).toBe(21);
    });

    test('Part 1, puzzle input', () => {
        expect(day8_1(input)).toBe(1820);
    });

    test('Part 2, example 1', () => {
        expect(day8_2(sample)).toBe(8);
    });

    test('Part 2, puzzle input', () => {
        expect(day8_2(input)).toBe(385112);
    });
});
