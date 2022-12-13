import { readFileSync } from 'fs';
import { day11_1, day11_2 } from './day11';
import console from 'console';

global.console = console;

const sample = readFileSync('day11/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day11/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 11: Monkey in the Middle', () => {
    test('Part 1, example 1', () => {
        expect(day11_1(sample)).toBe(10605);
    });

    test('Part 1, puzzle input', () => {
        expect(day11_1(input)).toBe(56595);
    });

    test('Part 2, example 1', () => {
        expect(day11_2(sample)).toBe(2713310158);
    });

    test('Part 2, puzzle input', () => {
        expect(day11_2(input)).toBe(0);
    });
});
