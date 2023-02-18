import { CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import ToolMoveHelper from "../ToolMoveHelper";
import { _obj_value } from "../../../logic/proto_pen_method/proto_obj_extract";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-themes-all";
import { langs } from "@uiw/codemirror-extensions-langs";

function CommandTool() {
  const [value, setValue] = React.useState("Hello World!");
  const containerWidth = 350;
  const containerHeight = 300;
  const onChange = React.useCallback((value: string) => {
    setValue(value);
  }, []);
  return (
    <ToolMoveHelper
      top={300}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          color={"grey.200"}
          sx={{ fontSize: 12, pb: 0, pt: 1, px: 1,fontWeight: "bold" }}
        >
          Property Tool
        </Typography>
      </CardContent>
      <CardActions>
        <ReactCodeMirror
          value={value}
          style={{ fontSize: "14px" }}
          width={containerWidth - 23 + "px"}
          height={containerHeight - 35 + "px"}
          theme={vscodeDark}
          extensions={[langs.tsx(), langs.html(), langs.css(), langs.php()]}
          onChange={onChange}
          placeholder={"Let's take a note!"}
        />
      </CardActions>
    </ToolMoveHelper>
  );
}

export default CommandTool;
