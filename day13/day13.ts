const day13_1 = (input: string[]): number => {
    let rightOrderPairs = 0;
    let pairNo = 1;
    for (let i = 0; i < input.length; i += 3, pairNo++) {
        if (comparePairs(JSON.parse(input[i]), JSON.parse(input[i + 1]))) {
            rightOrderPairs += pairNo;
        }
    }
    return rightOrderPairs;
};

const day13_2 = (input: string[]): number => {
    let packets = input.filter((line) => line != '').map(line => JSON.parse(line));
    packets.push([[2]], [[6]]);
    packets.sort((a, b) => (comparePairs(a, b) ? -1 : 1));
    let decoderKeys = 1;
    for (let i = 0; i < packets.length; i++) {
        if (
            JSON.stringify(packets[i]) == JSON.stringify([[2]]) ||
            JSON.stringify(packets[i]) == JSON.stringify([[6]])
        ) {
            decoderKeys *= i + 1;
        }
    }
    return decoderKeys;
};

function comparePairs(left, right): boolean | null {
    let i = 0;
    for (; i < left.length; i++) {
        // If the right list runs out of items first, the inputs are not in the right order.
        if (i >= right.length) return false;

        // If both values are lists, compare the first value of each list, then the second value, and so on.
        if (Array.isArray(left[i]) && Array.isArray(right[i])) {
            let rightOrder = comparePairs(left[i], right[i]);
            if (rightOrder != null) return rightOrder;

            // If both values are integers, the lower integer should come first.
        } else if (!Array.isArray(left[i]) && !Array.isArray(right[i])) {
            if (left[i] < right[i]) return true;
            if (left[i] > right[i]) return false;
            // Otherwise, the inputs are the same integer; continue checking the next part of the input.

            // If exactly one value is an integer, convert the integer to a list which contains that integer as its only value, then retry the comparison.
        } else if (!Array.isArray(left[i])) {
            let rightOrder = comparePairs([left[i]], right[i]);
            if (rightOrder != null) return rightOrder;
        } else if (!Array.isArray(right[i])) {
            let rightOrder = comparePairs(left[i], [right[i]]);
            if (rightOrder != null) return rightOrder;
        }
    }
    // If the left list runs out of items first, the inputs are in the right order.
    if (i < right.length) return true;

    //If the lists are the same length and no comparison makes a decision about the order, continue checking the next part of the input.
    return null;
}

export { day13_1, day13_2 };
