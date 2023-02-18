import { debounce } from "lodash";
import React from "react";

function GetContainerSize(props: {
  children?: any;
  onResizeFinished: any;
  target: any;
}) {
  const onResizeFinishHandler = React.useCallback(
    debounce((size) => {
      props.onResizeFinished(size);
    }, 100),
    []
  );
  React.useEffect(() => {
    let container: null | HTMLElement = null;
    let observer: any = null;
    if (props.target) {
      container = props.target.current;
      observer = new ResizeObserver(() => {
        onResizeFinishHandler({
          width: container!.clientWidth,
          height: container!.clientHeight,
        });
      });
      observer.observe(container);
    }
    return () => {
      if (props.target) {
        observer.unobserve(container);
      }
    };
  }, [props.target]);
  return <React.Fragment>{props.children}</React.Fragment>;
}

export default GetContainerSize;
