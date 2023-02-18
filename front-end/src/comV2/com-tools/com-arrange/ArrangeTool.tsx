import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import React from "react";
import ToolMoveHelper from "../ToolMoveHelper";
import {
  useAppDispatch,
} from "../../../logic/redux-store/hooks";
import {
  arrangeSelectedElement,
} from "../../../logic/redux-store/feature/ElementObjectSlice";

//declare the const and add the material UI style

function ArrangeTool() {
  const dispatch = useAppDispatch();
  const [input, setInput] = React.useState({
    c: 1,
    g: 15,
  });
  const containerWidth = 200;
  const containerHeight = 135;
  
  const arrangeHandler = () => {
    dispatch(
      arrangeSelectedElement({
        c: input.c,
        g: input.g,
      })
    );
  };

  return (
    <ToolMoveHelper
      top={250}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          color={"grey.200"}
          sx={{ p: 1, fontSize: 12, pb: 0, fontWeight: "bold" }}
        >
          Arrange Tool
        </Typography>
      </CardContent>
      <CardActions>
        <CustomTextField
          type="number"
          label={"Columns"}
          value={input.c}
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, c: Number(ev.target.value) };
            });
          }}
        />
        <CustomTextField
          type="number"
          label={"Gap"}
          value={input.g}
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, g: Number(ev.target.value) };
            });
          }}
        />
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            flexGrow: 1,
          }}
          onClick={arrangeHandler}
        >
          Arrange
        </Button>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default ArrangeTool;
