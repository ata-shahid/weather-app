/**
 * Eine Utility-Funktion zur Umrechnung von Temperaturen von Kelvin in Celsius.
 * 
 * Diese Funktion akzeptiert eine Temperatur in Kelvin als Eingabe und gibt die entsprechende Temperatur in Celsius zurück.
 * 
 * Der Zweck dieser Funktion ist es, Temperaturwerte, die von Wetter-APIs häufig in Kelvin bereitgestellt werden,
 * in Celsius umzuwandeln, um sie benutzerfreundlicher darzustellen.
 * 
 */
export function celsiusConverter(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}
