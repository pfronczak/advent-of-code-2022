const day15_1 = (input: string[], row: number): number => {
    const sensors = parseInput(input);
    const coverage = calculateCoverage(sensors, row);
    console.log(Array.from(coverage.entries()).sort((a, b) => a[0] - b[0]));
    return Array.from(coverage.values()).filter((v) => v === '#').length;
};

const day15_2 = (input: string[], spaceLimit: number): number => {
    const sensors = parseInput(input);
    for (let i = 0; i <= spaceLimit; i++) {
        let ranges = calculateCoverageRanges(sensors, i, spaceLimit);
        if (ranges.length > 1 || ranges[0].end < spaceLimit) {
            process.stdout.write(`${i}: ${ranges}\n`);
            return (ranges[0].end + 1) * 4000000 + i;
        }
    }
    return 0;
};

function parseInput(input: string[]) {
    const sensors: Sensor[] = [];
    for (const line of input) {
        let [, sensorX, sensorY, beaconX, beaconY] =
            /Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/.exec(
                line
            );
        sensors.push(
            new Sensor(
                {
                    x: Number(sensorX),
                    y: Number(sensorY),
                },
                {
                    x: Number(beaconX),
                    y: Number(beaconY),
                }
            )
        );
    }
    return sensors;
}

function calculateCoverage(sensors: Sensor[], row: number) {
    const coverage: Map<number, Tile> = new Map();
    for (const sensor of sensors) {
        if (sensor.location.y == row)
            setCoverage('S', sensor.location, coverage);
        if (sensor.nearestBeacon.y == row)
            setCoverage('B', sensor.nearestBeacon, coverage);
    }
    for (const sensor of sensors) {
        let yOffset = Math.abs(sensor.location.y - row);
        if (yOffset > sensor.beaconDistance) continue;

        for (
            let x = sensor.location.x - sensor.beaconDistance + yOffset;
            x <= sensor.location.x + sensor.beaconDistance - yOffset;
            x++
        ) {
            setCoverage(
                '#',
                {
                    x,
                    y: row,
                },
                coverage
            );
        }
    }
    return coverage;
}

function setCoverage(tile: Tile, point: Point, coverage: Map<number, Tile>) {
    if (!coverage.has(point.x)) {
        coverage.set(point.x, tile);
    }
}

function calculateCoverageRanges(
    sensors: Sensor[],
    row: number,
    maxX: number
): Range[] {
    const ranges = [];
    for (const sensor of sensors) {
        let yOffset = Math.abs(sensor.location.y - row);
        if (yOffset > sensor.beaconDistance) continue;
        let sensorCoverageStart = sensor.location.x - sensor.beaconDistance + yOffset;
        let sensorCoverageEnd = sensor.location.x + sensor.beaconDistance - yOffset;
        if (sensorCoverageEnd < 0 || sensorCoverageStart > maxX) continue;
        addRange(
            new Range({
                start: Math.max(
                    0,
                    sensorCoverageStart
                ),
                end: Math.min(
                    maxX,
                    sensorCoverageEnd
                ),
            }),
            ranges
        );
    }
    return ranges;
}

function addRange(newRange: Range, ranges: Range[]) {
    let i = 0;
    let toDelete = 0;
    for (; i < ranges.length; i++) {
        if (ranges[i].overlaps(newRange)) {
            let j = i;
            do {
                if (ranges[j].start < newRange.start)
                    newRange.start = ranges[j].start;
                if (ranges[j].end > newRange.end) newRange.end = ranges[j].end;
                toDelete++;
                j++;
            } while (j < ranges.length && ranges[j].overlaps(newRange));
            break;
        }
        if (ranges[i].start > newRange.start) {
            break;
        }
    }
    ranges.splice(i, toDelete, newRange);
    return ranges;
}

function distance(a: Point, b: Point) {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y);
}

class Sensor {
    location: Point;
    nearestBeacon: Point;
    beaconDistance: number;

    constructor(location, nearestBeacon) {
        this.location = location;
        this.nearestBeacon = nearestBeacon;
        this.beaconDistance = distance(location, nearestBeacon);
    }
}

type Point = {
    x: number;
    y: number;
};

class Range {
    start: number;
    end: number;

    constructor({ start, end }) {
        this.start = start;
        this.end = end;
    }

    overlaps(other: Range) {
        return this.start <= other.end + 1 && this.end + 1 >= other.start;
    }

    toString() {
        return `[${this.start},${this.end}]`;
    }
}

type Tile = 'B' | 'S' | '#';

export { day15_1, day15_2, addRange, Range };
