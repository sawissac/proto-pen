export interface ProtoPenMarkLocation {
  name: string;
  x: number;
  y: number;
}

export function createMarkLocation(
  name: string,
  x: number,
  y: number
): ProtoPenMarkLocation {
  return {
    name,
    x,
    y,
  };
}
