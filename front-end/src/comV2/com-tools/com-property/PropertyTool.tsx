import {
  Button,
  CardActions,
  CardContent,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import React from "react";
import ToolMoveHelper from "../ToolMoveHelper";
import { setMessage } from "../../../logic/redux-store/feature/UserInterfaceSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import {
  setTextOfActiveObject,
  setTypeOfActiveObject,
} from "../../../logic/redux-store/feature/ElementObjectSlice";
import { _obj_value } from "../../../logic/proto_pen_method/proto_obj_extract";
import { ComponentModel } from "../../../logic/ComponentModel";

function PropertyTool() {
  const elementObjRedux = useAppSelector((s) => s.object);
  const activeElement = elementObjRedux.activeElement;

  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState("Hello World!");
  const [selectV, setSelectV] = React.useState(ComponentModel.bm);
  const comModelList = _obj_value(ComponentModel).filter(
    (i) => i !== ComponentModel.nm
  );
  const containerWidth = 200;
  const containerHeight = 200;

  function onChange(ev: any) {
    setValue(ev.target.value);
  }
  const applyHandler = () => {
    if (activeElement && value) {
      dispatch(setTypeOfActiveObject(selectV));
      dispatch(setTextOfActiveObject(value));
      dispatch(
        setMessage({
          type: "success",
          message: "Success: Applied",
        })
      );
    }
    if (!activeElement) {
      dispatch(
        setMessage({
          type: "warning",
          message: "Fail: Please Select Element",
        })
      );
    } else if (activeElement && value) {
      dispatch(
        setMessage({
          type: "warning",
          message: "Fail: Please fill the input",
        })
      );
    }
  };
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
          value={selectV}
          onChange={(value) => {
            setSelectV(value.target.value);
          }}
        >
          {comModelList.map((i: any, index) => {
            return (
              <MenuItem key={index} value={i} sx={{ fontSize: 14 }}>
                {i}
              </MenuItem>
            );
          })}
        </Select>
      </CardActions>
      <CardActions>
        <CustomTextField
          disable={selectV !== ComponentModel.bm ? false : true}
          type="text"
          label={"Model Name"}
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
          onClick={applyHandler}
        >
          apply
        </Button>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default PropertyTool;
