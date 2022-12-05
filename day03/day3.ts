const day3_1 = (input: string[]): number => {
    let itemTypesSum = 0;
    for (const line of input) {
        itemTypesSum += priority(findCommon(line));
    }
    return itemTypesSum;
};

function findCommon(inputLine: string): string {
    let items = inputLine.split('');
    for (let i = 0; i < items.length / 2; i++) {
        for (let j = items.length / 2; j < items.length; j++) {
            if (items[i] == items[j]) {
                return items[i];
            }
        }
    }
    return '';
}

const day3_2 = (input: string[]): number => {
    let badgeSum = 0;
    for (let i = 0; i < input.length; i += 3) {
        badgeSum += priority(findCommonBetweenGroups(input.slice(i, i + 3)));
    }
    return badgeSum;
};

function findCommonBetweenGroups(groups: string[]): string {
    const items = groups[0].split('');
    const compareGroups = groups.slice(1);
    for (const item of items) {
        let itemFound = compareGroups.every((group) => {
            let compareItems = group.split('');
            for (const cmpItem of compareItems) {
                if (item == cmpItem) {
                    return true;
                }
            }
            return false;
        });
        if (itemFound) return item;
    }
    return '';
}

let priorites: { [char: string]: number };

function priority(char: string): number {
    if (priorites == null) {
        priorites = {};
        for (let i = 0; i < 26; i++) {
            priorites[String.fromCharCode('a'.charCodeAt(0) + i)] = i + 1;
        }
        for (let i = 0; i < 26; i++) {
            priorites[String.fromCharCode('A'.charCodeAt(0) + i)] = i + 27;
        }
    }
    return priorites[char];
}

export { day3_1, day3_2 };
