import { Button, CardActions, CardContent, Typography } from "@mui/material";
import ToolMoveHelper from "../ToolMoveHelper";
import { setMessage } from "../../../logic/redux-store/feature/UserInterfaceSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import { setElementPosMulti } from "../../../logic/redux-store/feature/ElementObjectSlice";

function MoveTool() {
  const pinRedux = useAppSelector((state) => state.ui.pin);
  const elementObjectRedux = useAppSelector((state) => state.object);
  const dispatch = useAppDispatch();
  const containerWidth = 200;
  const containerHeight = 135;
  const moveHandler = () => {
    const selectedElement = elementObjectRedux.selectedElement;
    const activeElement = elementObjectRedux.activeElement;
    const toMove = [activeElement, ...selectedElement];
    const pin = pinRedux;

    if (!activeElement) toMove.shift();

    if (toMove.length > 0) {
      dispatch(
        setMessage({
          type: "success",
          message: `Success: ${toMove.length} Elements Moved`,
        })
      );
      dispatch(
        setElementPosMulti({
          list: toMove,
          position: { x: pin.x + 5, y: pin.y + 20 } as any,
        })
      );
    } else {
      dispatch(
        setMessage({
          type: "warning",
          message: `Fail: Select elements to move`,
        })
      );
    }
  };
  return (
    <ToolMoveHelper
      top={200}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          color={"grey.200"}
          sx={{ p: 1, fontSize: 12, pb: 0, fontWeight: "bold" }}
        >
          Move Tool
        </Typography>
      </CardContent>
      <CardContent sx={{ p: 0 }}>
        <Typography color={"grey.200"} sx={{ p: 1, fontSize: 12, pb: 0 }}>
          Ctrl + Click on canvas, pin icon will appear and select or click the
          element.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            flexGrow: 1,
          }}
          onClick={moveHandler}
        >
          Move
        </Button>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default MoveTool;
