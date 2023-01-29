import { setActiveElement } from "../../logic/redux-store/feature/ElementObjectSlice";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";

export function RecursiveElement({ data }: { data: string[] }) {
  const eODR = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();

  return (
    <>
      {data.map((i: string, index) => {
        if (!eODR.elementObjectData[i]) {
          return <></>;
        }

        let getCss: any = Object.keys(eODR.elementObjectData[i].className);

        getCss = getCss.reduce((p: any, c: any) => {
          let cssData = eODR.elementObjectData[c].css;
          p = { ...p, ...cssData };
          return p;
        }, {});

        const style = {
          width: eODR.elementObjectData[i].w,
          height: eODR.elementObjectData[i].h,
          boxShadow: i === eODR.activeElement ? "0px 0px 0px 2px #2183e9" : "",
          ...getCss,
        };

        return (
          <div
            key={index}
            style={style}
            onClick={() => {
              dispatch(setActiveElement(i));
            }}
          >
            {eODR.elementObjectData[i].text}
            {eODR.elementObjectData[i].relationship.children ? (
              <RecursiveElement
                data={eODR.elementObjectData[i].relationship.children}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
}
