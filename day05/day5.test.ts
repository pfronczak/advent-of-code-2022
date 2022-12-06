import { readFileSync } from 'fs';
import { day5_1, day5_2 } from './day5';

const sample = readFileSync('day05/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.replaceAll('\r', ''));
const input = readFileSync('day05/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.replaceAll('\r', ''));

describe('Day 5: Supply Stacks', () => {
    test('Part 1, example 1', () => {
        expect(day5_1(sample)).toBe('CMZ');
    });

    test('Part 1, puzzle input', () => {
        expect(day5_1(input)).toBe('FZCMJCRHZ');
    });

    test('Part 2, example 1', () => {
        expect(day5_2(sample)).toBe('MCD');
    });

    test('Part 2, puzzle input', () => {
        expect(day5_2(input)).toBe('JSDHQMZGF');
    });
});
