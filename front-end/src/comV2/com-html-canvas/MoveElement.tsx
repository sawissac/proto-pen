import {
  setActiveElementPos,
  setWidthOfActiveObject,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import { _if, setPx } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";
import { fetchCss } from "../../logic/proto_pen_method/proto_css_fetch";
import { current } from "../../logic/proto_pen_method/proto_event";
import { motion, useMotionValue, animate } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { ProtoPenElement } from "../../logic/proto_pen_method/proto_create_element";
import React from "react";
import { ComponentModel } from "../../logic/ComponentModel";

interface MoveElementArgs {
  data: ProtoPenElement;
  listener: any;
  children?: any;
  style?: React.CSSProperties;
}

export function MoveElement(options: MoveElementArgs) {
  const elObjectRedux = useAppSelector((state) => state.object);
  const canvasSpaceRedux = useAppSelector(s=>s.ui.canvasSpaceSize)
  const dispatch = useAppDispatch();

  const eleRef = React.useRef(null);

  const x = useMotionValue(options.data.position.x);
  const y = useMotionValue(options.data.position.y);

  React.useEffect(() => {
    x.set(options.data.position.x);
    y.set(options.data.position.y);
    animate(x, options.data.position.x);
    animate(y, options.data.position.y);
  }, [options.data.position]);

  const box = {
    left: 20,
    top: 20,
    right: canvasSpaceRedux - 20,
    bottom: canvasSpaceRedux - 20,
  };

  const animation = {
    start: {
      scale: 0,
    },
    end: {
      scale: 1,
    },
  };

  function onDragEnd() {
    let xValue =
      x.get() < 0
        ? 0
        : x.get() + options.data.w > canvasSpaceRedux
        ? canvasSpaceRedux - options.data.w - 5
        : x.get();
    let yValue =
      y.get() < 0
        ? 0
        : y.get() + options.data.h > canvasSpaceRedux
        ? canvasSpaceRedux - options.data.h - 5
        : y.get();

    dispatch(
      setActiveElementPos({
        activeElement: options.data.name,
        position: {
          x: xValue,
          y: yValue,
          dx: xValue + options.data.w,
          dy: yValue + options.data.h,
        },
      })
    );
  }
  
  //! changes
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
    position: "absolute",
    backgroundColor: _if(
      options.data.type,
      ComponentModel.tm,
      "transparent",
      color.primary
    ),
    width: _if(
      options.data.type,
      ComponentModel.nm,
      setPx(260),
      setPx(options.data.w)
    ),
    height: _if(
      options.data.type,
      ComponentModel.nm,
      "max-content",
      setPx(options.data.h)
    ),
    zIndex: options.data.layer,
    ...options.style,
    ...fetchedCss,
    x,
    y,
  };

  if (options.data.type === ComponentModel.tm) {
    return (
      <motion.div
        variants={animation}
        initial={"start"}
        animate={"end"}
        ref={eleRef}
        style={style}
        onClick={options.listener}
        drag
        dragConstraints={box}
        dragMomentum={false}
        onDragEnd={onDragEnd}
      >
        <div>{options.data.text}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={animation}
      initial={"start"}
      animate={"end"}
      ref={eleRef}
      style={style}
      onClick={options.listener}
      drag
      dragConstraints={box}
      dragMomentum={false}
      onDragEnd={onDragEnd}
    >
      {options.children}
    </motion.div>
  );
}
