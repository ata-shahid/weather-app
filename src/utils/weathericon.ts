
export function weatherIcon(name: string, dayTime: string): string {
    const hours = new Date(dayTime).getHours();
    const isDayTime = hours >= 6 && hours < 18;
    const suffix = isDayTime ? "d" : "n";
    return name.replace(/.$/, suffix);
}
