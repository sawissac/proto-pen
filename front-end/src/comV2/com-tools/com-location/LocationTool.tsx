import {
  Button,
  ButtonGroup,
  CardActions,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { CustomTextField } from "../CustomTextField";
import React from "react";
import ToolMoveHelper from "../ToolMoveHelper";
import {
  setMessage,
  setUiState,
} from "../../../logic/redux-store/feature/UserInterfaceSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../logic/redux-store/hooks";
import {
  createElementObject,
  setActiveElement,
} from "../../../logic/redux-store/feature/ElementObjectSlice";
import { setMarkLocation } from "../../../logic/redux-store/feature/MarkLocationSlice";
import {
  IconCurrentLocation,
  IconMapPin,
  IconTrash,
} from "@tabler/icons-react";
import { grey } from "@mui/material/colors";
import LocationList from "./LocationList";
import { math_extract, math_half } from "../../../logic/proto_pen_method/proto_math";

//declare the const and add the material UI style

function LocationTool() {
  const UiRedux = useAppSelector((s) => s.ui);
  const dispatch = useAppDispatch();
  const [input, setInput] = React.useState({
    x: 0,
    y: 0,
    name: "M1",
  });

  const containerWidth = 200;
  const containerHeight = 345;

  function canvasCenterHandler() {
    const canvasSpaceSize = math_half(UiRedux.canvasSpaceSize);
    const screenWidth = math_half(UiRedux.canvasWidth);
    const screenHeight = math_half(UiRedux.screen.height);
    dispatch(
      setUiState({
        name: "scrollRequest",
        value: {
          x: math_extract(canvasSpaceSize, screenWidth),
          y: math_extract(canvasSpaceSize, screenHeight),
        },
      })
    );
  }

  function goLocationHandler() {
    dispatch(
      setUiState({
        name: "scrollRequest",
        value: {
          x: input.x,
          y: input.y,
        },
      })
    );
  }

  function markLocationHandler() {
    const name = input.name;

    if (name) {
      dispatch(
        setMessage({
          type: "success",
          message: `Success: Location ${input.name} marked at ${input.x}, ${input.y}`,
        })
      );
      dispatch(
        setMarkLocation({
          name,
          x: input.x,
          y: input.y,
        })
      );
    } else {
      dispatch(
        setMessage({
          type: "warning",
          message: `Fail: mark name can't be empty!`,
        })
      );
    }
  }

  React.useEffect(() => {
    setInput((s) => ({
      ...s,
      x: Math.trunc(UiRedux.scrollPos.x),
      y: Math.trunc(UiRedux.scrollPos.y),
    }));
  }, [UiRedux.scrollPos]);

  return (
    <ToolMoveHelper
      top={150}
      containerHeight={containerHeight}
      containerWidth={containerWidth}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          color={"grey.200"}
          sx={{ p: 1, fontSize: 12, pb: 0, fontWeight: "bold" }}
        >
          New Element Tool
        </Typography>
      </CardContent>
      <CardActions>
        <CustomTextField
          type="number"
          label={"LX"}
          value={input.x}
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, x: Math.trunc(parseInt(ev.target.value)) };
            });
          }}
        />
        <CustomTextField
          type="number"
          label={"LY"}
          value={input.y}
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, y: Math.trunc(parseInt(ev.target.value)) };
            });
          }}
        />
        <CustomTextField
          type="text"
          label={"Name"}
          value={input.name}
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, name: ev.target.value };
            });
          }}
        />
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          startIcon={<IconMapPin size={13} color={grey[200]} />}
          sx={{
            flexGrow: 1,
          }}
          onClick={markLocationHandler}
        >
          Mark Location
        </Button>
      </CardActions>
      <CardActions>
        <LocationList />
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            flexGrow: 1,
          }}
          onClick={goLocationHandler}
        >
          Go to {`${input.x},${input.y}`}
        </Button>
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            flexGrow: 1,
          }}
          onClick={canvasCenterHandler}
        >
          Canvas Center
        </Button>
      </CardActions>
    </ToolMoveHelper>
  );
}

export default LocationTool;
