import { readFileSync } from 'fs';
import { day14_1, day14_2 } from './day14.js';

const sample = readFileSync('day14/sample.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());
const input = readFileSync('day14/input.txt', 'utf8')
    .split('\n')
    .map((line) => line.trim());

day14_2(input);
