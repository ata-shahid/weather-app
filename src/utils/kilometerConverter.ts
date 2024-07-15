/**
 * Eine Utility-Funktion zur Umrechnung von Entfernungen in Metern in Kilometer.
 * 
 * Diese Funktion akzeptiert eine Entfernung in Metern als Eingabe und gibt die entsprechende Entfernung in Kilometern als Zeichenkette zurück, formatiert mit der Einheit "km".
*/
export function kilometerConverter(meters: number): string {
    return `${(meters / 1000).toFixed(0)} km`;
}
