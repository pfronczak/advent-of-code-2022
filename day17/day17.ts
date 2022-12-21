const day17_1 = (input: string[]): number => {
    const jets = Array.from(input[0]);
    const { grid } = simulate(jets, 2022);
    grid.print();
    return grid.grid.length;
};

const day17_2 = (input: string[]): number => {
    const TOTAL_ROUNDS = 1000000000000;
    const jets = Array.from(input[0]);
    let {
        grid,
        roundOffset,
        roundCycle,
        heightOffset,
        heightCycle,
        jetOffset,
        shapeOffset,
    } = simulate(jets, 20000, new Grid(), 2);
    // grid.print();
    let { grid: reminderGrid } = simulate(
        jets,
        (TOTAL_ROUNDS - roundOffset) % roundCycle,
        grid,
        0,
        jetOffset,
        shapeOffset
    );
    let reminderHeight = reminderGrid.grid.length - grid.grid.length;
    return (
        heightOffset +
        Math.floor((TOTAL_ROUNDS - roundOffset) / roundCycle) * heightCycle +
        reminderHeight
    );
};

function simulate(jets, rounds, grid = new Grid(), cycles = 0, startJet = 0, startShape = 0) {
    let j = startJet;
    let s = startShape;
    const roundCycle = new Set();
    let cycle = 0;
    let roundOffset, heightOffset;
    for (let round = 0; (cycles == 0 || cycle < cycles) && round < rounds; round++) {
        let roundId = (j % jets.length) * 10 + (s % SHAPES.length);
        if (roundCycle.has(roundId)) {
            process.stdout.write(
                `round: ${round}, shape: ${s % SHAPES.length}, jet: ${
                    j % jets.length
                }, height: ${grid.grid.length}\n`
            );
            if (cycle == 0) {
                roundOffset = round;
                heightOffset = grid.grid.length;
            }
            roundCycle.clear();
            cycle++;
            if (cycles && cycle == cycles) {
                return {
                    grid,
                    roundOffset,
                    heightOffset,
                    roundCycle: round - roundOffset,
                    heightCycle: grid.grid.length - heightOffset,
                    jetOffset: j % jets.length,
                    shapeOffset: s % SHAPES.length
                };
            }
        }
        roundCycle.add(roundId);
        let rock = new Rock({
            y: grid.grid.length + 3,
            x: 2,
            shape: SHAPES[s++ % SHAPES.length],
        });
        while (true) {
            rock.push(jets[j++ % jets.length], grid);
            rock.fall(grid);
            if (rock.stopped) {
                grid.add(rock);
                break;
            }
        }
    }
    return { grid };
}

class Grid {
    grid: number[][] = [];

    add(rock: Rock) {
        while (this.grid.length < rock.y + rock.shape.length) {
            this.grid.push(new Array(7));
        }
        for (let y = 0; y < rock.shape.length; y++) {
            for (let x = 0; x < rock.shape[y].length; x++) {
                if (rock.shape[y][x])
                    this.grid[rock.y + y][rock.x + x] = rock.shape[y][x];
            }
        }
    }

    print() {
        for (let y = this.grid.length - 1; y >= 0; y--) {
            for (let x = 0; x < 7; x++) {
                process.stdout.write(this.grid[y]?.[x] ? '#' : '.');
            }
            process.stdout.write('\n');
        }
        process.stdout.write('\n');
    }
}

class Rock {
    x: number;
    y: number;
    shape: number[][];
    stopped: boolean = false;

    constructor({ x, y, shape }) {
        Object.assign(this, { x, y, shape });
    }

    push(jetDir: string, grid: Grid) {
        let newX = jetDir == '<' ? this.x - 1 : this.x + 1;
        if (newX < 0 || newX + this.shape[0].length - 1 > 6) return;
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x] && grid.grid[this.y + y]?.[newX + x])
                    return;
            }
        }
        this.x = newX;
    }

    fall(grid: Grid) {
        let newY = this.y - 1;
        if (newY < 0) {
            this.stopped = true;
            return;
        }
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x] && grid.grid[newY + y]?.[this.x + x]) {
                    this.stopped = true;
                    return;
                }
            }
        }
        this.y = newY;
    }
}

const SHAPES = [
    [[1, 1, 1, 1]],
    [
        [null, 1, null],
        [1, 1, 1],
        [null, 1, null],
    ],
    [
        [1, 1, 1],
        [null, null, 1],
        [null, null, 1],
    ],
    [[1], [1], [1], [1]],
    [
        [1, 1],
        [1, 1],
    ],
];

export { day17_1, day17_2 };
