import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import React from "react";
import ToolMoveHelper from "../ToolMoveHelper";
import { setMessage } from "../../../logic/redux-store/feature/UserInterfaceSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import {
  createElementObject,
  setActiveElement,
} from "../../../logic/redux-store/feature/ElementObjectSlice";

//declare the const and add the material UI style

function NewElementTool() {
  const uuiRedux = useAppSelector((s) => s.object.uniqueId);
  const canvasSpaceSizeRedux = useAppSelector(
    (s) => s.ui.canvasSpaceSize
  );
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState(1);
  const containerWidth = 200;
  const containerHeight = 135;

  function onChange(ev: any) {
    setValue(ev.target.value);
  }

  const createElementHandler = () => {
    if (value <= 0) {
      dispatch(
        setMessage({
          type: "warning",
          message: "Times value should be above zero!",
        })
      );
    } else {
      dispatch(setActiveElement(""));
      dispatch(
        setMessage({
          type: "success",
          message: `${value} Element Created!`,
        })
      );
      dispatch(
        createElementObject({
          uid: uuiRedux,
          times: Math.abs(Number(value)),
          a: canvasSpaceSizeRedux,
        })
      );
    }
  };
  return (
    <ToolMoveHelper
      top={10}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography color={"grey.200"} sx={{ p: 1, fontSize: 12, pb: 0, fontWeight: "bold" }}>
          New Element Tool
        </Typography>
      </CardContent>
      <CardActions>
        <CustomTextField
          type="number"
          label={"Times"}
          value={value}
          onChange={onChange}
        />
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            flexGrow: 1,
          }}
          onClick={createElementHandler}
        >
          Create
        </Button>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default NewElementTool;
