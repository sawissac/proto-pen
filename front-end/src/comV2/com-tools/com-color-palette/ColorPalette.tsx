import {
  Box,
  CardActions,
  CardContent,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import ToolMoveHelper from "../ToolMoveHelper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import { _obj_value } from "../../../logic/proto_pen_method/proto_obj_extract";
import { ChromePicker } from "react-color";
import { updateCssProps } from "../../../logic/redux-store/feature/ElementObjectSlice";

function ColorPaletteTool() {
  const elementObjRedux = useAppSelector((s) => s.object);
  const elementObjectData = elementObjRedux.elementObjectData;
  const activeNode = elementObjRedux.activeNode;

  const dispatch = useAppDispatch();
  const [color, setColor] = React.useState("#ffffff");
  const [value, setValue] = React.useState("backgroundColor");
  const cssPropertyList = ["backgroundColor", "color"];

  const containerWidth = 200;
  const containerHeight = 300;

  return (
    <ToolMoveHelper
      top={300}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          color={"grey.200"}
          sx={{ p: 1, fontSize: 12, pb: 0, fontWeight: "bold" }}
        >
          Property Tool
        </Typography>
      </CardContent>
      <CardActions>
        <Select
          variant="outlined"
          size="small"
          color="primary"
          sx={{
            fontSize: 14,
            width: 200,
          }}
          value={value}
          onChange={(value) => {
            setValue(value.target.value);
          }}
        >
          {cssPropertyList.map((i: any, index) => {
            return (
              <MenuItem key={index} value={i} sx={{ fontSize: 14 }}>
                {i}
              </MenuItem>
            );
          })}
        </Select>
      </CardActions>
      <CardActions>
        <Box pt={0}>
          <ChromePicker
            styles={{
              default: {
                picker: {
                  width: 183,
                },
              },
            }}
            color={color}
            disableAlpha={true}
            onChangeComplete={(color) => {
              setColor(color.hex);
              if (activeNode) {
                const css = {
                  ...elementObjectData[activeNode].css,
                  [value]: color.hex,
                };
                dispatch(
                  updateCssProps({
                    activeEl: activeNode,
                    css,
                  })
                );
              }
            }}
          />
        </Box>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default ColorPaletteTool;
