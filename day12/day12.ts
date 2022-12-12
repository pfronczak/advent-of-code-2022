const day12_1 = (input: string[]): number => {
    const { heightMap, start, finish } = readHeightMap(input);
    const path = pathSearch(start, finish, heightMap);
    console.log(path);
    return path.length - 1;
};

const day12_2 = (input: string[]): number => {
    const { heightMap, start, finish } = readHeightMap(input);
    let minPath;
    for (let y = 0; y < heightMap.length; y++) {
        for (let x = 0; x < heightMap[y].length; x++) {
            if (heightMap[y][x] == 'a'.charCodeAt(0)) {
                let path = pathSearch(`${x},${y}`, finish, heightMap);
                if (
                    minPath == null ||
                    (path.length > 0 && path.length < minPath.length)
                ) {
                    minPath = path;
                }
            }
        }
    }
    console.log(minPath);
    return minPath.length - 1;
};

function readHeightMap(input: string[]) {
    const heightMap: number[][] = [];
    let start, finish;
    for (let y = 0; y < input.length; y++) {
        let line = Array.from(input[y]);
        let heightRow: number[] = [];
        for (let x = 0; x < line.length; x++) {
            if (line[x] == 'S') {
                start = `${x},${y}`;
                heightRow.push('a'.charCodeAt(0));
            } else if (line[x] == 'E') {
                finish = `${x},${y}`;
                heightRow.push('z'.charCodeAt(0));
            } else {
                heightRow.push(line[x].charCodeAt(0));
            }
        }
        heightMap.push(heightRow);
    }
    return {
        heightMap,
        start,
        finish,
    };
}

function pathSearch(from: string, to: string, heightMap: number[][]): string[] {
    const openSet = new Set([from]);
    const cameFrom = new Map();
    const gScore = new Map([[from, 0]]);
    const fScore = new Map([[from, distance(from, to)]]);
    while (openSet.size > 0) {
        let current = Array.from(openSet).reduce((min, p) =>
            (fScore.get(p) ?? Infinity) < (fScore.get(p) ?? Infinity) ? p : min
        );
        if (current == to) {
            const path = [];
            while (current) {
                path.unshift(current);
                current = cameFrom.get(current);
            }
            return path;
        }
        openSet.delete(current);
        let [x, y] = current.split(',').map(Number);
        for (const neighbor of [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
        ]) {
            if (
                neighbor.x < 0 ||
                neighbor.y < 0 ||
                neighbor.y >= heightMap.length ||
                neighbor.x >= heightMap[0].length
            )
                continue;
            if (heightMap[neighbor.y][neighbor.x] > heightMap[y][x] + 1)
                continue;

            let neighborCoords = `${neighbor.x},${neighbor.y}`;
            let neighborGScore = gScore.get(current) + 1;
            if (neighborGScore < (gScore.get(neighborCoords) ?? Infinity)) {
                cameFrom.set(neighborCoords, current);
                gScore.set(neighborCoords, neighborGScore);
                fScore.set(
                    neighborCoords,
                    neighborGScore + distance(neighborCoords, to)
                );
                openSet.add(neighborCoords);
            }
        }
    }
    return [];
}

function distance(from: string, to: string): number {
    let [fromX, fromY] = from.split(',').map(Number);
    let [toX, toY] = to.split(',').map(Number);
    return Math.abs(toX - fromX) + Math.abs(toY - fromY);
}

export { day12_1, day12_2 };
