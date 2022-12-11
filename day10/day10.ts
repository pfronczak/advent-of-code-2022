const day10_1 = (input: string[]): number => {
    let signalSum = 0;
    let opAddr = 0;
    let op,
        arg,
        nextOpCycle = 1;
    let regX = 1;
    for (let cycle = 1; cycle <= 220; cycle++) {
        if (cycle == nextOpCycle) {
            if (op == 'addx') regX += Number(arg);
            if (opAddr >= input.length) break;
            [op, arg] = input[opAddr++].split(' ');
            if (op == 'addx') nextOpCycle = cycle + 2;
            else nextOpCycle = cycle + 1;
        }
        if ((cycle - 20) % 40 == 0) {
            signalSum += cycle * regX;
        }
    }
    return signalSum;
};

const day10_2 = (input: string[]) => {
    let opAddr = 0;
    let op,
        arg,
        nextOpCycle = 1;
    let regX = 1;
    for (let cycle = 1; cycle <= 240; cycle++) {
        if (cycle == nextOpCycle) {
            if (op == 'addx') regX += Number(arg);
            if (opAddr >= input.length) break;
            [op, arg] = input[opAddr++].split(' ');
            if (op == 'addx') nextOpCycle = cycle + 2;
            else nextOpCycle = cycle + 1;
        }
        let pixel = (cycle - 1) % 40;
        if (pixel >= regX - 1 && pixel <= regX + 1) process.stdout.write('#');
        else process.stdout.write('.');
        if (cycle % 40 == 0) process.stdout.write('\n');
    }
};

export { day10_1, day10_2 };
