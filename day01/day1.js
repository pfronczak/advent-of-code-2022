const day1_1 = (input) => {
    let maxCal = 0;
    let currElfSum = 0;
    for (const line of input) {
        if (line == '') {
            if (currElfSum > maxCal) maxCal = currElfSum;
            currElfSum = 0;
        } else {
            let cal = Number(line);
            currElfSum += cal;
        }
    }
    if (currElfSum > maxCal) maxCal = currElfSum;
    return maxCal;
};

const day1_2 = (input) => {
    let elfCal = [];
    let currElfSum = 0;
    for (const line of input) {
        if (line == '') {
            elfCal.push(currElfSum);
            currElfSum = 0;
        } else {
            let cal = Number(line);
            currElfSum += cal;
        }
    }
    elfCal.push(currElfSum);
    elfCal.sort((a, b) => b - a);
    return elfCal[0] + elfCal[1] + elfCal[2];
};

export { day1_1, day1_2 };
