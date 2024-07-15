/**
 * Eine Utility-Funktion zur Berechnung der Differenz in Tagen zwischen zwei Daten.
 * 
 * Diese Funktion akzeptiert zwei Datumsobjekte und gibt die Anzahl der vollen Tage 
 * zwischen diesen beiden Daten zurück.
 * 
 * Der Zweck dieser Funktion ist es, die Differenz in Tagen zu berechnen, was nützlich
 * sein kann, um Zeiträume zu bestimmen oder zeitbezogene Berechnungen durchzuführen.
 * 
 */

export const getDaysDifference = (startDate: Date, endDate: Date): number => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    return Math.floor(differenceInMilliseconds / oneDayInMilliseconds);
  };
