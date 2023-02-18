import React from "react";
import { current } from "../../logic/proto_pen_method/proto_event";
import {
  math_extract,
  math_half,
} from "../../logic/proto_pen_method/proto_math";
import { useAppSelector } from "../../logic/redux-store/hooks";

function ScrollRefreshCenter(props: { children?: any; target: any }) {
  const UiRedux = useAppSelector((s) => s.ui);
  React.useEffect(() => {
    const canvas = current(props.target);
    const canvasSpaceSize = math_half(UiRedux.canvasSpaceSize);
    const screenWidth = math_half(UiRedux.canvasWidth);
    const screenHeight = math_half(UiRedux.screen.height);

    canvas.scrollTo({
      behavior: "smooth",
      top: math_extract(canvasSpaceSize, screenHeight),
      left: math_extract(canvasSpaceSize, screenWidth),
    });
  }, [UiRedux.screen]);
  return <React.Fragment>{props.children}</React.Fragment>;
}

export default ScrollRefreshCenter;
