const day6_1 = (input: string): number => {
    const buffer = Array.from(input);
    let i = 3;
    for(; i < buffer.length; i++) {
        let last4chars = new Set(buffer.slice(i - 3, i + 1));
        if (last4chars.size == 4) {
            break;
        }
    }
    return i + 1;
};

const day6_2 = (input: string): number => {
    const buffer = Array.from(input);
    let i = 13;
    for(; i < buffer.length; i++) {
        let last14chars = new Set(buffer.slice(i - 13, i + 1));
        if (last14chars.size == 14) {
            break;
        }
    }
    return i + 1;
};

export { day6_1, day6_2 };
