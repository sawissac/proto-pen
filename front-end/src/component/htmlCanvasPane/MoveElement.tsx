import React from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { ProtoPenElement } from "../../logic/proto_pen_method/proto_create_element";
import {
  setActiveElementPos,
  setWidthOfActiveObject,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import { _if, setPx } from "../../logic/theme/property";
import { SelectDataEnum } from "../tools/PropertyTool";
import { color } from "../../logic/theme/color";
import { fetchCss } from "../../logic/proto_pen_method/proto_css_fetch";
import { useMoveUtilForElementMove } from "../../logic/hooks/ElementMoveHook";
import { current } from "../../logic/proto_pen_method/proto_event";

interface MoveElementArgs {
  data: ProtoPenElement;
  parent:
    | any
    | {
        current: {
          clientWidth: number;
          clientHeight: number;
        };
      };
  listener: any;
  children?: any;
  style?: React.CSSProperties;
}

export function MoveElement(options: MoveElementArgs) {
  const elObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();
  const eleRef = React.useRef(null);

  useMoveUtilForElementMove(
    eleRef,
    options.parent,
    options.data.position,
    setActiveElementPos,
    options.data.name,
    [eleRef, options.data.position.x]
  );

  React.useEffect(() => {
    let element: any = current(eleRef);
    let resizeObserver = new ResizeObserver(() => {
      dispatch(
        setWidthOfActiveObject({
          activeEl: options.data.name,
          w: current(eleRef).clientWidth,
          h: current(eleRef).clientHeight,
        })
      );
    });
    resizeObserver.observe(element);
    return () => {
      resizeObserver.unobserve(element);
    };
  }, [eleRef]);

  const fetchedCss = fetchCss(
    elObjectRedux.elementObjectData,
    options.data.className
  );

  //! disable property
  ["position", "top", "left", "color", "boxShadow"].map((i) => {
    if (fetchedCss[i]) delete fetchedCss[i];
  });

  const style: React.CSSProperties = {
    left: setPx(options.data.position.x),
    top: setPx(options.data.position.y),
    backgroundColor: _if(
      options.data.type,
      SelectDataEnum.txc,
      "transparent",
      color.primary
    ),
    width: _if(
      options.data.type,
      SelectDataEnum.nm,
      setPx(260),
      setPx(options.data.w)
    ),
    height: _if(
      options.data.type,
      SelectDataEnum.nm,
      "max-content",
      setPx(options.data.h)
    ),
    borderRadius: _if(options.data.type, SelectDataEnum.nm, setPx(7), setPx(0)),
    zIndex: "5",
    ...options.style,
    ...fetchedCss,
  };

  if (options.data.type === SelectDataEnum.txc) {
    return (
      <div ref={eleRef} style={style} onClick={options.listener}>
        <div>{options.data.text}</div>
      </div>
    );
  }

  return (
    <div ref={eleRef} style={style} onClick={options.listener}>
      {options.children}
    </div>
  );
}
