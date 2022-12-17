let bestSolutionFound;
let bestSolutionPath;

const day16_1 = (input: string[]): number => {
    const tunnelsGraph = parseInput(input);
    const distanceMatrix = distances(tunnelsGraph);
    bestSolutionFound = 0;
    bestSolutionPath = [];
    solve(
        tunnelsGraph.get('AA'),
        Array.from(
            Array.from(distanceMatrix.keys()).filter((n) => n != 'AA')
        ).sort(
            (a, b) =>
                tunnelsGraph.get(b).flowRate - tunnelsGraph.get(a).flowRate
        ),
        0,
        ['AA'],
        tunnelsGraph,
        distanceMatrix,
        30
    );
    console.log(bestSolutionPath);
    return bestSolutionFound;
};

function solve(
    start: Node,
    childNodes: string[],
    score: number,
    path: string[],
    graph: Map<string, Node>,
    distanceMatrix: Map<string, Map<string, number>>,
    roundsLeft: number
) {
    score += roundsLeft * start.flowRate;
    if (childNodes.length == 0) {
        if (score > bestSolutionFound) {
            bestSolutionFound = score;
            bestSolutionPath = path;
        }
    }
    for (const node of childNodes) {
        if (roundsLeft - distanceMatrix.get(start.name).get(node) - 1 <= 0) {
            if (score > bestSolutionFound) {
                bestSolutionFound = score;
                bestSolutionPath = path;
            }
        }
        let branchUpperBound =
            score +
            childNodes.reduce(
                (sum, n) => (sum += graph.get(n).flowRate * (roundsLeft - 2)),
                0
            );
        if (branchUpperBound > bestSolutionFound) {
            solve(
                graph.get(node),
                childNodes.filter((n) => n != node),
                score,
                [...path, node],
                graph,
                distanceMatrix,
                roundsLeft - distanceMatrix.get(start.name).get(node) - 1
            );
        }
    }
}

const day16_2 = (input: string[]): number => {
    const tunnelsGraph = parseInput(input);
    const distanceMatrix = distances(tunnelsGraph);
    bestSolutionFound = 0;
    bestSolutionPath = [];
    solveTogether(
        [tunnelsGraph.get('AA'), tunnelsGraph.get('AA')],
        Array.from(
            Array.from(distanceMatrix.keys()).filter((n) => n != 'AA')
        ).sort(
            (a, b) =>
                tunnelsGraph.get(b).flowRate - tunnelsGraph.get(a).flowRate
        ),
        0,
        [[], []],
        tunnelsGraph,
        distanceMatrix,
        26,
        [26, 26]
    );
    console.log(bestSolutionPath);
    return bestSolutionFound;
};

function solveTogether(
    start: Node[],
    nodesLeft: string[],
    score: number,
    path: string[][],
    graph: Map<string, Node>,
    distanceMatrix: Map<string, Map<string, number>>,
    roundsLeft: number,
    destRound: number[]
) {
    let branchUpperBound =
        score +
        Math.max(0, destRound[0]) * start[0].flowRate +
        Math.max(0, destRound[1]) * start[1].flowRate +
        (roundsLeft > 2
            ? nodesLeft.reduce(
                  (sum, n) => (sum += graph.get(n).flowRate * (roundsLeft - 2)),
                  0
              )
            : 0);
    if (branchUpperBound < bestSolutionFound) {
        return;
    }

    if (destRound[0] == roundsLeft) {
        score += roundsLeft * start[0].flowRate;
        path[0] = [...path[0], start[0].name];
    }
    if (destRound[1] == roundsLeft) {
        score += roundsLeft * start[1].flowRate;
        path[1] = [...path[1], start[1].name];
    }

    if (
        (nodesLeft.length == 0 &&
            destRound[0] >= roundsLeft &&
            destRound[1] >= roundsLeft) ||
        roundsLeft == 0
    ) {
        process.stdout.write(`${roundsLeft}: ${path[0]} ${path[1]}\n`);
        process.stdout.write(`score: ${score}\n`);
        if (score > bestSolutionFound) {
            bestSolutionFound = score;
            bestSolutionPath = path;
        }
        return;
    }

    if (nodesLeft.length == 0) {
        solveTogether(
            [start[0], start[1]],
            [],
            score,
            [...path],
            graph,
            distanceMatrix,
            Math.max(0, Math.min(destRound[0], destRound[1])),
            [destRound[0], destRound[1]]
        );
    }

    if (destRound[0] == roundsLeft && destRound[1] == roundsLeft) {
        for (let i = 0; i < nodesLeft.length; i++) {
            for (let j = 0; j < nodesLeft.length; j++) {
                if (j == i) continue;
                solveTogether(
                    [graph.get(nodesLeft[i]), graph.get(nodesLeft[j])],
                    nodesLeft.filter(
                        (n) => n != nodesLeft[i] && n != nodesLeft[j]
                    ),
                    score,
                    [...path],
                    graph,
                    distanceMatrix,
                    Math.max(
                        roundsLeft -
                            distanceMatrix
                                .get(start[0].name)
                                .get(nodesLeft[i]) -
                            1,
                        roundsLeft -
                            distanceMatrix
                                .get(start[1].name)
                                .get(nodesLeft[j]) -
                            1,
                        0
                    ),
                    [
                        roundsLeft -
                            distanceMatrix
                                .get(start[0].name)
                                .get(nodesLeft[i]) -
                            1,
                        roundsLeft -
                            distanceMatrix
                                .get(start[1].name)
                                .get(nodesLeft[j]) -
                            1,
                    ]
                );
            }
        }
    } else if (destRound[0] == roundsLeft) {
        for (const node of nodesLeft) {
            solveTogether(
                [graph.get(node), start[1]],
                nodesLeft.filter((n) => n != node),
                score,
                [...path],
                graph,
                distanceMatrix,
                Math.max(
                    roundsLeft -
                        distanceMatrix.get(start[0].name).get(node) -
                        1,
                    destRound[1],
                    0
                ),
                [
                    roundsLeft -
                        distanceMatrix.get(start[0].name).get(node) -
                        1,
                    destRound[1],
                ]
            );
        }
    } else if (destRound[1] == roundsLeft) {
        for (const node of nodesLeft) {
            solveTogether(
                [start[0], graph.get(node)],
                nodesLeft.filter((n) => n != node),
                score,
                [...path],
                graph,
                distanceMatrix,
                Math.max(
                    destRound[0],
                    roundsLeft -
                        distanceMatrix.get(start[1].name).get(node) -
                        1,
                    0
                ),
                [
                    destRound[0],
                    roundsLeft -
                        distanceMatrix.get(start[1].name).get(node) -
                        1,
                ]
            );
        }
    }
}

function parseInput(input: string[]) {
    const graph: Map<string, Node> = new Map();
    for (const line of input) {
        let [, node, flowRate] = /Valve (\w+) has flow rate=(\d+)/.exec(line);
        graph.set(node, {
            name: node,
            flowRate: Number(flowRate),
        });
    }
    for (const line of input) {
        let [, node, linkedNodes] = /Valve (\w+) .* valves? (.+)/.exec(line);
        graph.get(node).linkedNodes = linkedNodes
            .split(', ')
            .map((n) => graph.get(n));
    }
    return graph;
}

function distances(graph: Map<string, Node>): Map<string, Map<string, number>> {
    const distances: Map<string, Map<string, number>> = new Map();
    for (const node of graph.values()) {
        if (node.flowRate > 0 || node.name == 'AA') {
            distances.set(node.name, dijkstra(node));
        }
    }
    return distances;
}

function dijkstra(node: Node): Map<string, number> {
    const distances: Map<string, number> = new Map();
    distances.set(node.name, 0);
    const queue = new Set([node]);
    while (queue.size > 0) {
        let u = Array.from(queue).reduce((min, n) =>
            (distances.get(n.name) ?? Infinity) <
            (distances.get(min.name) ?? Infinity)
                ? n
                : min
        );
        queue.delete(u);
        for (const n of u.linkedNodes) {
            if (
                !queue.has(n) &&
                distances.get(u.name) + 1 < (distances.get(n.name) ?? Infinity)
            ) {
                distances.set(n.name, distances.get(u.name) + 1);
                queue.add(n);
            }
        }
    }
    return distances;
}

type Node = {
    name: string;
    flowRate: number;
    linkedNodes?: Node[];
};

export { day16_1, day16_2 };
