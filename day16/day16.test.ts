import { readFileSync } from 'fs';
import { day16_1, day16_2 } from './day16';

const sample = readFileSync('day16/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day16/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 16: Proboscidea Volcanium', () => {
    test('Part 1, example 1', () => {
        expect(day16_1(sample)).toBe(1651);
    });

    test('Part 1, puzzle input', () => {
        expect(day16_1(input)).toBe(2056);
    });

    test('Part 2, example 1', () => {
        expect(day16_2(sample)).toBe(0);
    });

    test('Part 2, puzzle input', () => {
        expect(day16_2(input)).toBe(0);
    });
});
