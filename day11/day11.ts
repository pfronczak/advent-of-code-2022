const day11_1 = (input: string[]): number => {
    const monkeys: Monkey[] = [];
    for (let i = 0; i < input.length; i += 7) {
        monkeys.push(new Monkey(input.slice(i, i + 6)));
    }
    for (let round = 0; round < 20; round++) {
        for (const monkey of monkeys) {
            monkey.inspect(monkeys, worry => Math.floor(worry / 3));
        }
    }
    monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
    return monkeys[0].itemsInspected * monkeys[1].itemsInspected;
};

const day11_2 = (input: string[]): number => {
    const monkeys: Monkey[] = [];
    for (let i = 0; i < input.length; i += 7) {
        monkeys.push(new Monkey(input.slice(i, i + 6)));
    }
    for (let round = 1; round <= 10000; round++) {
        for (const monkey of monkeys) {
            monkey.inspect(monkeys, worry => Math.floor(worry % 100));
        }

        if (round == 1 || round == 20 || round % 1000 == 0) {
            console.log(`== After round ${round} ==`);
            for (let i = 0; i < monkeys.length; i++) {
                console.log(`Monkey ${i}: ${monkeys[i].itemsInspected} (${monkeys[i].items.join(',')})`);
            }
        }
    }
    monkeys.sort((a, b) => b.itemsInspected - a.itemsInspected);
    return monkeys[0].itemsInspected * monkeys[1].itemsInspected;
};

class Monkey {
    items: number[] = [];
    divTest: number;
    operation;
    throwIfTrue: number;
    throwIfFalse: number;
    itemsInspected = 0;

    constructor(notes: string[]) {
        this.items = /Starting items: (.*)/
            .exec(notes[1])[1]
            .split(', ')
            .map(Number);
        let [, opExpr] = /Operation: new = (.*)/.exec(notes[2]);
        this.operation = new Function('old', `return ${opExpr}`).bind(this);
        this.divTest = Number(/Test: divisible by (\d+)/.exec(notes[3])[1]);
        this.throwIfTrue = Number(
            /If true: throw to monkey (\d+)/.exec(notes[4])[1]
        );
        this.throwIfFalse = Number(
            /If false: throw to monkey (\d+)/.exec(notes[5])[1]
        );
    }

    inspect(monkeys: Monkey[], worryRelief) {
        for (const item of this.items) {
            let itemVal = worryRelief(this.operation(item));
            if (itemVal % this.divTest == 0) {
                monkeys[this.throwIfTrue].items.push(itemVal);
            } else {
                monkeys[this.throwIfFalse].items.push(itemVal);
            }
            this.itemsInspected++;
        }
        this.items = [];
    }
}

export { day11_1, day11_2 };
