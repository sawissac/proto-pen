export function math_half(x: number): number {
  return x / 2;
}

export function math_extract(x: number, y: number) {
  return x - y;
}

export function math_add(x: number, ...y: number[]) {
  return y.reduce((p, c) => p + c, x);
}
