/**
 * Eine Utility-Funktion, um Klassenamen bedingt zu kombinieren und zusammenzuführen.
 * 
 * Diese Funktion akzeptiert eine variable Anzahl von Eingaben, die Strings, Zahlen Booleans, Objekte oder Arrays sein können,
 * und gibt eine einzelne Zeichenkette mit den kombinierten Klassenamen zurück. 
 * 
 * Die Funktion nutzt zwei Hilfsfunktionen:
 * - `customClsx`: Kombiniert Klassenamen basierend auf den Eingabewerten.
 * - `customTwMerge`: Führt Tailwind CSS-Klassenamen zusammen und entfernt Duplikate.
 * 
 * Der Zweck dieser Funktion ist es, Klassenamen effizient zu verwalten und 
 * zu verhindern, dass duplizierte oder widersprüchliche Klassen angewendet werden. Dies ist besonders
 * nützlich in der dynamischen Erstellung von Klassenamen basierend auf Bedingungen.
 * 
 * Beispiel:
 * cn('class1', 'class2', { 'class3': true, 'class4': false }) 
 * // Gibt 'class1 class2 class3' zurück
 */
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
