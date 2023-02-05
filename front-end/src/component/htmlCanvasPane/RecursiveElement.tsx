import { fetchCss } from "../../logic/proto_pen_method/proto_css_fetch";
import { setActiveElement } from "../../logic/redux-store/feature/ElementObjectSlice";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { boxShadow } from "../../logic/theme/property";

export function RecursiveElement({ data }: { data: string[] }) {
  const elObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();
  const selectedElementList = new Set(elObjectRedux.selectedElement);

  return (
    <>
      {data.map((i: string, index) => {
        if (!elObjectRedux.elementObjectData[i]) {
          return <></>;
        }

        const style = {
          width: elObjectRedux.elementObjectData[i].w,
          height: elObjectRedux.elementObjectData[i].h,
          boxShadow: boxShadow(
            i === elObjectRedux.activeElement,
            selectedElementList.has(i)
          ),
          ...fetchCss(
            elObjectRedux.elementObjectData,
            elObjectRedux.elementObjectData[i].className
          ),
        };

        return (
          <div
            key={index}
            style={style}
            onClick={() => {
              dispatch(setActiveElement(i));
            }}
          >
            {elObjectRedux.elementObjectData[i].text}
            {elObjectRedux.elementObjectData[i].relationship.children ? (
              <RecursiveElement
                data={elObjectRedux.elementObjectData[i].relationship.children}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
}
