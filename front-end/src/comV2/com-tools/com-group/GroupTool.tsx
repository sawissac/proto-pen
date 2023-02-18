import { Button, CardActions, CardContent, Typography } from "@mui/material";
import ToolMoveHelper from "../ToolMoveHelper";
import { setMessage } from "../../../logic/redux-store/feature/UserInterfaceSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import { groupToActiveElement } from "../../../logic/redux-store/feature/ElementObjectSlice";

function GroupTool() {
  const elementObjectRedux = useAppSelector((s) => s.object);
  const dispatch = useAppDispatch();
  const containerWidth = 200;
  const containerHeight = 135;
  const groupHandler = () => {
    const activeElement = elementObjectRedux.activeElement;
    if (activeElement) {
      const activeObj = elementObjectRedux.elementObjectData[activeElement];
      const cssSharedChild = activeObj.cssSharedChild;
      const selectedElement = elementObjectRedux.selectedElement;
      const has = () => {
        let flag = false;
        selectedElement.map((i) => {
          let isExit = Object.hasOwn(cssSharedChild, i);
          if (isExit) {
            flag = true;
          }
        });
        return flag;
      };

      if (has()) {
        dispatch(
          setMessage({
            type: "warning",
            message: "Fail: Element is already grouped",
          })
        );
      } else {
        dispatch(
          setMessage({
            type: "success",
            message: "Success: Element is grouped",
          })
        );
        dispatch(groupToActiveElement());
      }

    }else{
      dispatch(
        setMessage({
          type: "warning",
          message: "Fail: Pls select element",
        })
      );
    }
  };
  return (
    <ToolMoveHelper
      top={350}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          color={"grey.200"}
          sx={{ p: 1, fontSize: 12, pb: 0, fontWeight: "bold" }}
        >
          Group Tool
        </Typography>
      </CardContent>
      <CardContent sx={{ p: 0 }}>
        <Typography color={"grey.200"} sx={{ p: 1, fontSize: 12, pb: 0 }}>
          Select Element, click element that will become parent element and
          click group.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            flexGrow: 1,
          }}
          onClick={groupHandler}
        >
          Group
        </Button>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default GroupTool;
