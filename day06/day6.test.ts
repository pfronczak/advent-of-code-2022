import { readFileSync } from 'fs';
import { day6_1, day6_2 } from './day6';

const input = readFileSync('day06/input.txt', 'utf8');

describe('Day 6: Supply Stacks', () => {
    test('Part 1, examples', () => {
        expect(day6_1('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7);
        expect(day6_1('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5);
        expect(day6_1('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6);
        expect(day6_1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10);
        expect(day6_1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11);
    });

    test('Part 1, puzzle input', () => {
        expect(day6_1(input)).toBe(1235);
    });

    test('Part 2, examples', () => {
        expect(day6_2('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(19);
        expect(day6_2('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(23);
        expect(day6_2('nppdvjthqldpwncqszvftbrmjlhg')).toBe(23);
        expect(day6_2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(29);
        expect(day6_2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(26);
    });

    test('Part 2 puzzle input', () => {
        expect(day6_2(input)).toBe(3051);
    });
});
