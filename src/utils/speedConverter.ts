
export function speedConverter(meters: number): string {
    if (isNaN(meters)) {
        throw new Error("Invalid input. Expected a number.");
    }
    return `${(parseFloat(meters.toString())).toFixed(1)} m/s`;
}
