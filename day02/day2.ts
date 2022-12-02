const day2_1 = (input: string[]): number => {
    // prettier-ignore
    const ROUND_SCORE = {
        'A X': 3, 'A Y': 6, 'A Z': 0,
        'B X': 0, 'B Y': 3, 'B Z': 6,
        'C X': 6, 'C Y': 0, 'C Z': 3,
    };
    const SHAPE_SCORE = { X: 1, Y: 2, Z: 3 };

    let totalScore = 0;
    for (const line of input) {
        let [oppMove, myMove] = line.split(' ');
        totalScore += SHAPE_SCORE[myMove] + ROUND_SCORE[line];
    }
    return totalScore;
};

const day2_2 = (input: string[]): number => {
    // prettier-ignore
    const ROUND_STRATEGY = {
        'A X': 'SCISSORS', 'A Y': 'ROCK', 'A Z': 'PAPER',
        'B X': 'ROCK', 'B Y': 'PAPER', 'B Z': 'SCISSORS',
        'C X': 'PAPER', 'C Y': 'SCISSORS', 'C Z': 'ROCK',
    };
    const ROUND_SCORE = { X: 0, Y: 3, Z: 6 };
    const SHAPE_SCORE = { ROCK: 1, PAPER: 2, SCISSORS: 3 };

    let totalScore = 0;
    for (const line of input) {
        let [oppMove, roundOutcome] = line.split(' ');
        let myMove = ROUND_STRATEGY[line];
        totalScore += SHAPE_SCORE[myMove] + ROUND_SCORE[roundOutcome];
    }
    return totalScore;
};

export { day2_1, day2_2 };
