const day7_1 = (input: string[]): number => {
    const { rootDir, allDirs } = parseInput(input);
    calculateTotalSize(rootDir);
    let sizeSum = 0;
    for (const dir of allDirs) {
        if (dir.size < 100000) sizeSum += dir.size;
    }
    return sizeSum;
};

const day7_2 = (input: string[]): number => {
    const { rootDir, allDirs } = parseInput(input);
    calculateTotalSize(rootDir);
    allDirs.sort((a, b) => a.size - b.size);
    for (const dir of allDirs) {
        if (70000000 - rootDir.size + dir.size >= 30000000) {
            return dir.size;
        }
    }
    return 0;
};

function parseInput(input: string[]) {
    const rootDir: File = {
        name: '/',
        type: 'dir',
        children: [],
    };
    const allDirs: File[] = [ rootDir ];
    let curDir: File;
    for (const line of input) {
        let args = line.split(' ');
        if (args[0] == '$') {
            if (args[1] == 'cd') {
                switch (args[2]) {
                    case '/':
                        curDir = rootDir;
                        break;
                    case '..':
                        curDir = curDir.parent;
                        break;
                    default:
                        curDir = curDir.children.find(
                            (subdir) => subdir.name == args[2]
                        );
                        break;
                }
            }
        } else {
            if (args[0] == 'dir') {
                let newDir: File = {
                    name: args[1],
                    type: 'dir',
                    children: [],
                    parent: curDir,
                };
                curDir.children.push(newDir);
                allDirs.push(newDir);
            } else {
                curDir.children.push({
                    name: args[1],
                    type: 'file',
                    size: Number(args[0]),
                });
            }
        }
    }
    return {
        rootDir,
        allDirs,
    };
}

function calculateTotalSize(root: File) {
    root.size = root.size ?? 0;
    if (root.type == 'dir') {
        for (const child of root.children) {
            root.size += calculateTotalSize(child);
        }
    }
    return root.size;
}

function printDirTree(file: File) {
    console.group(`- ${file.name} (${file.type}, size=${file.size})`);
    if (file.type == 'dir') {
        file.children.forEach(printDirTree);
    }
    console.groupEnd();
}

type File = {
    name: string;
    type: 'dir' | 'file';
    size?: number;
    children?: File[];
    parent?: File;
};

export { day7_1, day7_2 };
