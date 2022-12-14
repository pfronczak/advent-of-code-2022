const day14_1 = (input: string[]): number => {
    const { grid, maxY } = parseInput(input);
    printGrid(grid);
    let sandUnits = 0;
    while (true) {
        let { y } = dropSand(grid, 500, 0, maxY);
        if (y > maxY) break;
        sandUnits++;
    }
    printGrid(grid);
    return sandUnits;
};

const day14_2 = (input: string[]): number => {
    const { grid, maxY } = parseInput(input);
    for (let x = 500 - maxY - 3; x <= 500 + maxY + 3; x++) {
        grid[maxY + 2][x] = 'rock';
    }
    printGrid(grid);
    let sandUnits = 0;
    while (true) {
        let { x, y } = dropSand(grid, 500, 0, maxY + 2);
        sandUnits++;
        if (y == 0 && x == 500) break;
    }
    printGrid(grid);
    return sandUnits;
};

type Tile = 'rock' | 'sand';

function parseInput(input: string[]) {
    const grid: Tile[][] = Array.from(Array(250), () => new Array(1000));
    let maxY = 0;
    for (const line of input) {
        let path = line.split(' -> ').map((coord) => {
            let [x, y] = coord.split(',');
            return {
                x: Number(x),
                y: Number(y),
            };
        });
        for (let i = 0; i < path.length - 1; i++) {
            let start, end;
            if (path[i].x < path[i + 1].x || path[i].y < path[i + 1].y) {
                start = path[i];
                end = path[i + 1];
            } else {
                start = path[i + 1];
                end = path[i];
            }
            if (start.y == end.y) {
                // Horizontal line
                for (let x = start.x; x <= end.x; x++) {
                    grid[start.y][x] = 'rock';
                }
            } else if (start.x == end.x) {
                // Vertical line
                for (let y = start.y; y <= end.y; y++) {
                    grid[y][start.x] = 'rock';
                }
            }
            if (end.y > maxY) maxY = end.y;
        }
    }
    return {
        grid,
        maxY,
    };
}

function dropSand(grid: Tile[][], startX, startY, maxY) {
    let x = startX,
        y = startY;
    while (y <= maxY) {
        if (!grid[y + 1][x]) {
            y++;
        } else if (!grid[y + 1][x - 1]) {
            y++;
            x--;
        } else if (!grid[y + 1][x + 1]) {
            y++;
            x++;
        } else {
            grid[y][x] = 'sand';
            return { x, y };
        }
    }
    return { x, y };
}

function printGrid(grid: Tile[][]) {
    let minX = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'rock') {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y > maxY) maxY = y;
            }
        }
    }

    for (let y = 0; y <= maxY + 1; y++) {
        for (let x = minX - 1; x <= maxX + 1; x++) {
            if (grid[y][x] == 'sand') process.stdout.write('o');
            else if (grid[y][x] == 'rock') process.stdout.write('#');
            else if (x == 500 && y == 0) process.stdout.write('+');
            else process.stdout.write(' ');
        }
        process.stdout.write('\n');
    }
}

export { day14_1, day14_2 };
