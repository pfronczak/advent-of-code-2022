const day5_1 = (input: string[]): string => {
    const { stacks, moves } = parseInput(input);
    for (const move of moves) {
        for (let i = 0; i < move.quantity; i++) {
            stacks[move.to - 1].push(stacks[move.from - 1].pop());
        }
    }
    return stacks.map((s) => s[s.length - 1]).join('');
};

const day5_2 = (input: string[]): string => {
    const { stacks, moves } = parseInput(input);
    for (const move of moves) {
        stacks[move.to - 1].push(
            ...stacks[move.from - 1].splice(-move.quantity, move.quantity)
        );
    }
    return stacks.map((s) => s[s.length - 1]).join('');
};

function parseInput(input: string[]) {
    let separatorLine = 0;
    while (input[separatorLine] != '' && separatorLine < input.length) {
        separatorLine++;
    }
    const stacks: string[][] = Array.from(
        Array((input[separatorLine - 1].length + 1) / 4),
        () => []
    );
    const moves = [];
    for (let i = separatorLine - 2; i >= 0; i--) {
        const line = Array.from(input[i]);
        for (let s = 0; s < stacks.length; s++) {
            if (line[s * 4 + 1] != ' ') {
                stacks[s].push(line[s * 4 + 1]);
            }
        }
    }
    for (let i = separatorLine + 1; i < input.length; i++) {
        let [, quantity, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(
            input[i]
        );
        moves.push({
            quantity,
            from,
            to,
        });
    }

    return {
        stacks,
        moves,
    };
}

export { day5_1, day5_2 };
