export default function pause(a: number, b = a) {
    a = a * 1000;
    b = b * 1000;

    if (a === b) {
        return new Promise((r) => setTimeout(r, a));
    }

    const delay = Math.floor(Math.random() * (b - a + 1) + a);
    return new Promise((r) => setTimeout(r, delay));
}
