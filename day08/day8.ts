const day8_1 = (input: string[]): number => {
    const grid: number[][] = [];
    for (const line of input) {
        grid.push(Array.from(line).map(Number));
    }
    let visibleTrees = 2 * grid.length + 2 * grid[0].length - 4;
    for (let y = 1; y < grid.length - 1; y++) {
        let row = grid[y];
        for (let x = 1; x < row.length - 1; x++) {
            let tree = row[x];
            let visible = 4;
            for (let i = x + 1; i < row.length; i++) {
                if (row[i] >= tree) {
                    visible--;
                    break;
                }
            }
            for (let i = x - 1; i >= 0; i--) {
                if (row[i] >= tree) {
                    visible--;
                    break;
                }
            }
            for (let i = y + 1; i < grid.length; i++) {
                if (grid[i][x] >= tree) {
                    visible--;
                    break;
                }
            }
            for (let i = y - 1; i >= 0; i--) {
                if (grid[i][x] >= tree) {
                    visible--;
                    break;
                }
            }
            if (visible > 0) visibleTrees++;
        }
    }
    return visibleTrees;
};

const day8_2 = (input: string[]): number => {
    const grid: number[][] = [];
    for (const line of input) {
        grid.push(Array.from(line).map(Number));
    }
    let maxScore = 0;
    for (let y = 1; y < grid.length - 1; y++) {
        let row = grid[y];
        for (let x = 1; x < row.length - 1; x++) {
            let tree = row[x];
            let score = 1;
            let visible = 0;
            for (let i = x + 1; i < row.length; i++) {
                visible++;
                if (row[i] >= tree) {
                    break;
                }
            }
            score *= visible;
            visible = 0;
            for (let i = x - 1; i >= 0; i--) {
                visible++;
                if (row[i] >= tree) {
                    break;
                }
            }
            score *= visible;
            visible = 0;
            for (let i = y + 1; i < grid.length; i++) {
                visible++;
                if (grid[i][x] >= tree) {
                    break;
                }
            }
            score *= visible;
            visible = 0;
            for (let i = y - 1; i >= 0; i--) {
                visible++;
                if (grid[i][x] >= tree) {
                    break;
                }
            }
            score *= visible;
            if (score > maxScore) maxScore = score;
        }
    }
    return maxScore;
};

export { day8_1, day8_2 };
