enum HintType {
    ONE_CORRECT_POSITION_CORRECT = '1cpc',
    ONE_CORRECT_POSITION_WRONG = '1cpw',
    TWO_CORRECT_POSITION_WRONG = '2cpw',
    ALL_WRONG = 'aw',
}

type Hint = {
    str: string;
    type: HintType;
}

function cartesian(input: string[][]): string[] {
    const r: string[][] = [], max = input.length-1;

    function helper(arr: string[], i: number) {
        for (let j=0, l = input[i].length; j<l; j++) {
            const a = arr.slice(0); // clone arr
            a.push(input[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }

    helper([], 0);
    return r.map((x) => x.join(''));
}

function hintBasedPossibilities(hints: Hint[], strRange: string, length: number): string[] {
    let list: string[][] = [];
    for (let i = 0; i < length; i++) {
        list[i] = strRange.split('');
    }

    for (const hint of hints) {
        switch (hint.type) {
            case HintType.ONE_CORRECT_POSITION_CORRECT: {
                for (let i = 0; i < length; i++) {
                    for (let j = 0; j < length; j++) {
                        if (i === j) continue;

                        const ind = list[j].indexOf(hint.str[i]);
                        if (ind !== -1) {
                            list[j][ind] = null;
                        }
                    }
                }
                break;
            }
            case HintType.ONE_CORRECT_POSITION_WRONG:
            case HintType.TWO_CORRECT_POSITION_WRONG:
            {
                for (let i = 0; i < length; i++) {
                    for (let j = 0; j < length; j++) {
                        if (i !== j) continue;

                        const ind = list[j].indexOf(hint.str[i]);
                        if (ind !== -1) {
                            list[j][ind] = null;
                        }
                    }
                }
                break;
            }
            case HintType.ALL_WRONG: {
                for (let i = 0; i < length; i++) {
                    for (let j = 0; j < length; j++) {
                        const ind = list[j].indexOf(hint.str[i]);
                        if (ind !== -1) {
                            list[j][ind] = null;
                        }
                    }
                }
                break;
            }
        }
    }

    list = list.map((col) => col.filter(Boolean));
    return cartesian(list);
}

function hintChecker(hints: Hint[], key: string): boolean {
    const s = new Set(key.split(''));
    if (s.size !== key.length) {
        return false;
    }

    for (const hint of hints) {
        switch (hint.type) {
            case HintType.ONE_CORRECT_POSITION_CORRECT: {
                let count = 0;
                for (let i = 0; i < key.length; i++) {
                    if (hint.str[i] === key[i]) {
                        count++;
                    }
                }
                if (count !== 1) return false;
                break;
            }
            case HintType.ONE_CORRECT_POSITION_WRONG: {
                let count = 0;
                for (let i = 0; i < key.length; i++) {
                    for (let k = 0; k < hint.str.length; k++) {
                        if (hint.str[k] === key[i] && k !== i) {
                            count++;
                            break;
                        }
                    }
                }
                if (count !== 1) return false;
                break;
            }
            case HintType.TWO_CORRECT_POSITION_WRONG: {
                let count = 0;
                for (let i = 0; i < key.length; i++) {
                    for (let k = 0; k < hint.str.length; k++) {
                        if (hint.str[k] === key[i] && k !== i) {
                            count++;
                            break;
                        }
                    }
                }
                if (count !== 2) return false;
                break;
            }
            case HintType.ALL_WRONG: {
                for (let i = 0; i < key.length; i++) {
                    for (let k = 0; k < hint.str.length; k++) {
                        if (hint.str[k] === key[i]) {
                            return false;
                        }
                    }
                }
                break;
            }
        }
    }

    return true;
}

function solve(hints: Hint[], strRange: string): string[] {
    // make sure the lengths are same
    let len = -1;
    for (const hint of hints) {
        const thisLen = hint.str.length;
        if (len === -1) {
            len = thisLen;
            continue;
        }

        if (len !== thisLen) {
            throw new Error('All hints should have same number of digits');
        }
    }

    // get some possible keys
    const probableKeys = hintBasedPossibilities(hints, strRange, len);

    // eliminate them
    const validKeys = probableKeys.filter((key) => hintChecker(hints, key));

    return validKeys;
}

// Parse arguments and execute

let start = -1;
for (let i = 0; i < process.argv.length; i++) {
    if (isNaN(parseInt(process.argv[i]))) {
        continue;
    }
    start = i;
    break;
}

if (start === -1) {
    console.log('no input');
    process.exit(-1);
}

const inputs = process.argv.slice(start);
if (inputs.length % 2 !== 0) {
    console.log('invalid argument count');
    process.exit(-1);
}

const hints: Hint[] = [];
for (let i = 0; i < inputs.length; i += 2) {
    if (isNaN(parseInt(inputs[i]))) {
        console.log(`expected a number, but got '${inputs[i]} ${inputs[i+1]}'`);
        process.exit(-1);
    }
    if (!(Object.values(HintType) as string[]).includes(inputs[i+1])) {
        console.log(`expected a hint type (e.g. ${Object.values(HintType).join(', ')}), but got '${inputs[i]} ${inputs[i+1]}'`);
        process.exit(-1);
    }

    hints.push({
        str: inputs[i],
        type: inputs[i+1] as HintType,
    });
}

console.log(solve(hints, '0123456789'));
