import { readFileSync } from 'fs';
import { day15_1, day15_2, addRange, Range } from './day15';

const sample = readFileSync('day15/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day15/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

describe('Day 15: Beacon Exclusion Zone', () => {
    test('Part 1, example 1', () => {
        expect(day15_1(sample, 10)).toBe(26);
    });

    test('Part 1, puzzle input', () => {
        expect(day15_1(input, 2000000)).toBe(5367037);
    });

    test('addRange tests', () => {
        expect(addRange(new Range({ start: 2, end: 4 }), [])).toEqual([
            { start: 2, end: 4 },
        ]);

        expect(
            addRange(new Range({ start: 2, end: 4 }), [
                new Range({ start: 6, end: 8 }),
            ])
        ).toEqual([
            { start: 2, end: 4 },
            { start: 6, end: 8 },
        ]);

        expect(
            addRange(new Range({ start: 2, end: 4 }), [
                new Range({ start: 5, end: 8 }),
            ])
        ).toEqual([{ start: 2, end: 8 }]);

        expect(
            addRange(new Range({ start: 2, end: 8 }), [
                new Range({ start: 4, end: 5 }),
            ])
        ).toEqual([{ start: 2, end: 8 }]);

        expect(
            addRange(new Range({ start: 4, end: 6 }), [
                new Range({ start: 1, end: 2 }),
                new Range({ start: 10, end: 15 }),
                new Range({ start: 20, end: 25 }),
            ])
        ).toEqual([
            { start: 1, end: 2 },
            { start: 4, end: 6 },
            { start: 10, end: 15 },
            { start: 20, end: 25 },
        ]);

        expect(
            addRange(new Range({ start: 16, end: 19 }), [
                new Range({ start: 1, end: 2 }),
                new Range({ start: 10, end: 15 }),
                new Range({ start: 20, end: 25 }),
            ])
        ).toEqual([
            { start: 1, end: 2 },
            { start: 10, end: 25 },
        ]);

        expect(
            addRange(new Range({ start: 5, end: 8 }), [
                new Range({ start: 1, end: 20 }),
            ])
        ).toEqual([{ start: 1, end: 20 }]);

        expect(
            addRange(new Range({ start: 2, end: 6 }), [
                new Range({ start: 1, end: 2 }),
                new Range({ start: 10, end: 15 }),
                new Range({ start: 20, end: 25 }),
            ])
        ).toEqual([
            { start: 1, end: 6 },
            { start: 10, end: 15 },
            { start: 20, end: 25 },
        ]);
    });

    test('Part 2, example 1', () => {
        expect(day15_2(sample, 20)).toBe(56000011);
    });

    test('Part 2, puzzle input', () => {
        expect(day15_2(input, 4000000)).toBe(11914583249288);
    });
});
