
type ClassValue = string | number | null | boolean | undefined | { [key: string]: any };

function customClsx(...inputs: ClassValue[]): string {
    const classes: string[] = [];
    for (const input of inputs) {
        if (typeof input === 'string' || typeof input === 'number') {
            classes.push(input.toString());
        } else if (typeof input === 'object' && input !== null) {
            if (Array.isArray(input)) {
                classes.push(customClsx(...input));
            } else {
                for (const key in input) {
                    if (input[key]) {
                        classes.push(key);
                    }
                }
            }
        }
    }
    return classes.join(' ');
}

function customTwMerge(...classNames: string[]): string {
    const classSet: Set<string> = new Set();
    classNames.forEach(className => {
        className.split(' ').forEach(name => {
            classSet.delete(name);
            classSet.add(name);
        });
    });
    return Array.from(classSet).join(' ');
}

export function cn(...inputs: ClassValue[]): string {
    return customTwMerge(customClsx(...inputs));
}
