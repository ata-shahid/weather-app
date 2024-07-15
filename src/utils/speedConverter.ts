/**
 * Eine Utility-Funktion zur Umrechnung von Geschwindigkeiten von Metern pro Sekunde in eine Zeichenkette mit der Einheit "m/s".
 * 
 * Diese Funktion akzeptiert eine Geschwindigkeit in Metern pro Sekunde als Eingabe und gibt die entsprechende Geschwindigkeit als Zeichenkette mit der Einheit "m/s" zurück.
 * 
 * Der Zweck dieser Funktion ist es, Geschwindigkeiten, die häufig in Wetter-APIs in Metern pro Sekunde angegeben werden,in eine benutzerfreundliche Form umzuwandeln.
*/
export function speedConverter(meters: number): string {
    if (isNaN(meters)) {
        throw new Error("Invalid input. Expected a number.");
    }
    return `${(parseFloat(meters.toString())).toFixed(1)} m/s`;
}
