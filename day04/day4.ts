const day4_1 = (input: string[]): number => {
    let containsCount = 0;
    for (const line of input) {
        let ranges = parseLine(line);
        if (
            (ranges[0].start <= ranges[1].start &&
                ranges[0].end >= ranges[1].end) ||
            (ranges[1].start <= ranges[0].start &&
                ranges[1].end >= ranges[0].end)
        ) {
            containsCount++;
        }
    }
    return containsCount;
};

const day4_2 = (input: string[]): number => {
    let overlapsCount = 0;
    for (const line of input) {
        let ranges = parseLine(line);
        if (
            ranges[0].start <= ranges[1].end &&
            ranges[0].end >= ranges[1].start
        ) {
            overlapsCount++;
        }
    }
    return overlapsCount;
};

function parseLine(line: string): {
    start: number;
    end: number;
}[] {
    return line.split(',').map((range) => {
        let [start, end] = range.split('-').map(Number);
        return {
            start,
            end,
        };
    });
}

export { day4_1, day4_2 };
