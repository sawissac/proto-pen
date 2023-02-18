import { Card } from "@mui/material";
import { useAppSelector } from "../../logic/redux-store/hooks";
import { motion } from "framer-motion";

function ToolMoveHelper(props: {
  containerWidth: number;
  containerHeight: number;
  top: number;
  children?: any;
}) {
  const UiRedux = useAppSelector((s) => s.ui);
  const animate = {
    start: {
      scale: 0,
    },
    end: {
      scale: 1,
    },
  };
  const conPos = {
    y: props.top,
    x: UiRedux.controlPaneWidth + UiRedux.canvasWidth - props.containerWidth - 17,
  }
  const box = {
    left: 0,
    top: 0,
    right: UiRedux.screen.width - props.containerWidth,
    bottom: UiRedux.screen.height - props.containerHeight,
  };
  return (
    <Card
      drag
      component={motion.div}
      dragConstraints={box}
      raised
      initial={animate.start}
      animate={animate.end}
      sx={{
        width: props.containerWidth,
        height: props.containerHeight,
        backgroundColor: "grey.900",
      }}
      style={
        {
          position: "absolute",
          ...conPos,
        } as any
      }
    >
      {props.children}
    </Card>
  );
}

export default ToolMoveHelper;
