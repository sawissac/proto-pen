import React from "react";
import {
  current,
  eventListener,
} from "../../logic/proto_pen_method/proto_event";
import { useAppDispatch } from "../../logic/redux-store/hooks";
import { setUiState } from "../../logic/redux-store/feature/UserInterfaceSlice";

function ScreenClick(props: { children: any; target: any }) {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    const canvasSpace = current(props.target);
    function mouseClickHandler(ev: MouseEvent) {
      if (ev.ctrlKey) {
        dispatch(
          setUiState({
            name: "pin",
            value: {
              x: ev.offsetX,
              y: ev.offsetY - 20,
            },
          })
        );
      }
    }
    const reClick = eventListener("click", canvasSpace, mouseClickHandler);

    return ()=>{
      reClick();
    }
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
}

export default ScreenClick;
