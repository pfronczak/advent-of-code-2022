const day9_1 = (input: string[]): number => {
    let tracing = new Map<string, boolean>();
    const head = new Point(0, 0),
        tail = new Point(0, 0);
    tracing.set(tail.coords, true);
    for (const line of input) {
        let parts = line.split(' ');
        let dir = parts[0],
            moves = Number(parts[1]);
        for (let i = 0; i < moves; i++) {
            head.move(dir, 1);
            tail.follow(head);
            tracing.set(tail.coords, true);
        }
    }
    // printTailTrace(tracing);
    return tracing.size;
};

const day9_2 = (input: string[]): number => {
    let tracing = new Map<string, boolean>();
    const knots = Array(10)
        .fill(null)
        .map(() => new Point(0, 0));
    tracing.set(knots[9].coords, true);
    for (const line of input) {
        let parts = line.split(' ');
        let dir = parts[0],
            moves = Number(parts[1]);
        for (let i = 0; i < moves; i++) {
            knots[0].move(dir, 1);
            for (let k = 1; k < knots.length; k++) {
                knots[k].follow(knots[k - 1]);
            }
            tracing.set(knots[9].coords, true);
        }
    }
    // printTailTrace(tracing);
    return tracing.size;
};

class Point {
    x = 0;
    y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    get coords() {
        return `${this.x},${this.y}`;
    }

    move(dir: string, distance: number) {
        switch (dir) {
            case 'U':
                this.y += distance;
                break;
            case 'D':
                this.y -= distance;
                break;
            case 'L':
                this.x -= distance;
                break;
            case 'R':
                this.x += distance;
                break;
            default:
                break;
        }
    }

    follow(head: Point) {
        if (Math.abs(head.x - this.x) > 1 || Math.abs(head.y - this.y) > 1) {
            this.x += Math.sign(head.x - this.x);
            this.y += Math.sign(head.y - this.y);
        }
    }
}

function printTailTrace(trace: Map<string, boolean>) {
    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (const key of trace.keys()) {
        let [x, y] = key.split(',').map(Number);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
    }

    for (let y = maxY; y >= minY; y--) {
        for (let x = minX; x <= maxX; x++) {
            if (x == 0 && y == 0) process.stdout.write('s');
            else if (trace.has(`${x},${y}`)) process.stdout.write('#');
            else process.stdout.write('.');
        }
        process.stdout.write('\n');
    }
}

export { day9_1, day9_2 };
