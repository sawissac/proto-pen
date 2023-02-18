import React from "react";
import { _arr_has } from "../../logic/proto_pen_method/proto_arr_extract";
import { fetchCss } from "../../logic/proto_pen_method/proto_css_fetch";
import { useAppSelector } from "../../logic/redux-store/hooks";
import { boxShadow } from "../../logic/theme/property";

export function RecursiveElement({ data }: { data: string[] }) {
  const elementObjRedux = useAppSelector((state) => state.object);
  const selectedElementList = _arr_has(elementObjRedux.selectedElement);

  return (
    <>
      {data.map((i: string, index) => {
        if (!elementObjRedux.elementObjectData[i]) {
          return <React.Fragment key={i}></React.Fragment>;
        }
        const style = {
          width: elementObjRedux.elementObjectData[i].w,
          height: elementObjRedux.elementObjectData[i].h,
          boxShadow: boxShadow(i === elementObjRedux.activeElement, selectedElementList.has(i)),
          ...fetchCss(elementObjRedux.elementObjectData, elementObjRedux.elementObjectData[i].className),
        };

        return (
          <div key={index} style={style}>
            {elementObjRedux.elementObjectData[i].text}
            {elementObjRedux.elementObjectData[i].relationship.children ? (
              <RecursiveElement data={elementObjRedux.elementObjectData[i].relationship.children} />
            ) : null}
          </div>
        );
      })}
    </>
  );
}
