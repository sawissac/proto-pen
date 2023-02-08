import { ProtoPenElement } from "./proto_create_element";

export interface ArrangeArgs {
  column: number;
  gap: number;
  originList: { [name: string]: ProtoPenElement };
  selectedList: string[];
  activeElement: string;
}

export function arrange(options: ArrangeArgs) {
  const { column, gap, originList, selectedList, activeElement } = options;

  if (!activeElement) {
    return originList;
  }

  const toRender = selectedList.sort(
    (a, b) => originList[a].layer - originList[b].layer
  );

  let preDx = originList[activeElement].position.x + originList[activeElement].w;
  let preDy = originList[activeElement].position.y;
  let result: { [x: string]: ProtoPenElement } = {};
  result[activeElement] = originList[activeElement];

  toRender.map((i: any, index: number) => {
    let col = index + 1;

    if (col % column === 0) {
      preDx = originList[activeElement].position.x - gap;
      let cal: ProtoPenElement[] = Object.values(result);
      cal = cal
        .slice(cal.length - column, cal.length)
        .sort((a, b) => b.h - a.h);
      preDy = cal[0].position.y + cal[0].h + gap;
    }

    result[i] = originList[i];
    result[i].position.x = preDx + gap;
    result[i].position.y = preDy;
    preDx = result[i].position.x + result[i].w;
  });

  return { ...originList, ...result };
}
