import React from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import {
  current,
  eventListener,
} from "../../logic/proto_pen_method/proto_event";
import { setUiState } from "../../logic/redux-store/feature/UserInterfaceSlice";
import { debounce } from "lodash";

function ScreenDragMoveHelper(props: {
  dragConstraint?: any;
  dragArea: any;
  children?: any;
}) {
  const handMoveRedux = useAppSelector((s) => s.tool.handMove.state);
  const scrollRequestRedux = useAppSelector(
    (s) => s.ui.scrollRequest
  );
  const dispatch = useAppDispatch();
  const [scale, setScale] = React.useState(1);
  const dragScrollCompleted = React.useCallback(
    debounce((pos) => {
      dispatch(
        setUiState({
          name: "scrollPos",
          value: pos,
        })
      );
    }, 100),
    []
  );

  React.useEffect(() => {
    let canvas = current(props.dragConstraint);
    let unScroll = eventListener("scroll", canvas, () => {
      dragScrollCompleted({
        x: canvas.scrollLeft,
        y: canvas.scrollTop,
      });
    });
    return () => {
      unScroll();
    };
  }, []);

  React.useEffect(() => {
    let canvas = current(props.dragConstraint);
    let canvasSpace = current(props.dragArea);
    let isDrag = false;

    function mouseDownHandler() {
      isDrag = true;
    }
    function mouseUpHandler() {
      isDrag = false;
      dispatch(
        setUiState({
          name: "scrollPos",
          value: {
            x: canvas.scrollLeft,
            y: canvas.scrollTop,
          },
        })
      );
    }
    function mouseMoveHandler(ev: MouseEvent) {
      if (isDrag && handMoveRedux) {
        canvas.scrollTo({
          left: canvas.scrollLeft - ev.movementX * 1.2,
          top: canvas.scrollTop - ev.movementY * 1.2,
        });
      }
    }
    function wheelHandler(ev: any) {
      ev.preventDefault();
      if (handMoveRedux) {
        if (ev.deltaY > 0) {
          canvasSpace.style.scale = String(scale);
          if (scale > 0.5) setScale((i) => i - 0.1);
        } else {
          canvasSpace.style.scale = String(scale);
          setScale((i) => i + 0.1);
        }
        dispatch(
          setUiState({
            name: "scale",
            value: scale,
          })
        );
      }
    }

    const reWheel = eventListener("wheel", canvasSpace, wheelHandler);
    const reMove = eventListener("mousemove", canvasSpace, mouseMoveHandler);
    const reDown = eventListener("mousedown", canvasSpace, mouseDownHandler);
    const reUp = eventListener("mouseup", canvasSpace, mouseUpHandler);

    return () => {
      reWheel();
      reMove();
      reDown();
      reUp();
    };
  }, [handMoveRedux, scale]);

  React.useEffect(() => {
    let canvas = current(props.dragConstraint);
    canvas.scrollTo({
      behavior: "smooth",
      left: scrollRequestRedux.x,
      top: scrollRequestRedux.y,
    });
  }, [scrollRequestRedux]);

  return <React.Fragment>{props.children}</React.Fragment>;
}

export default ScreenDragMoveHelper;
