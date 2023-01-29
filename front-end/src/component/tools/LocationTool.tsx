import React from "react";
import CustomStyle from "../../custom.module.css";
import { FieldWarper, InputField } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { LayerPane } from "../LayerPane";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { current } from "../../logic/proto_pen_method/proto_event";
import { math_half } from "../../logic/proto_pen_method/proto_math";
import { color } from "../../logic/theme/color";
import {
  IconMapPin,
  IconCurrentLocation,
  IconSquareMinus,
} from "@tabler/icons-react";
import {
  deleteMarkLocation,
  setMarkLocation,
} from "../../logic/redux-store/feature/MarkLocationSlice";
import {
  Divider,
  MessageDialogBox,
  Title,
} from "../io-component/MessageDialogBox";

interface LocationDialogArgs {
  parent: any;
  canvas: any;
}

export function LocationTool(options: LocationDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const markLocationRedux = useAppSelector((state) => state.markLocation);
  const uiRedux = useAppSelector((state) => state.userInterface);
  const dispatch = useAppDispatch();

  const toolRef = React.useRef(null);

  const [input, setInput] = React.useState({
    x: 0,
    y: 0,
    name: "M1",
  });

  const markLocationList: LocationListType[] = Object.values(
    markLocationRedux.markLocation
  );

  //! tool mover
  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.locationTool.position,
    changeToolsPos,
    "locationTool",
    []
  );

  //! scroll detector
  React.useEffect(() => {
    let canvas: any = null;
    let scrollHandler: any = null;

    if (options.canvas) {
      canvas = current(options.canvas);

      setInput((i) => ({
        ...i,
        x: Math.trunc(canvas.scrollLeft),
        y: Math.trunc(canvas.scrollTop),
      }));

      scrollHandler = () => {
        setInput((i) => ({
          ...i,
          x: Math.trunc(canvas.scrollLeft),
          y: Math.trunc(canvas.scrollTop),
        }));
      };

      canvas.addEventListener("scroll", scrollHandler);
    }

    return () => {
      if (canvas) canvas.removeEventListener("scroll", scrollHandler);
    };
  }, [options.canvas]);

  function canvasCenterHandler() {
    const canvas = current(options.canvas);
    const canvasSpaceSize = math_half(uiRedux.canvasSpaceSize);
    const screenWidth = math_half(uiRedux.screen.width);
    const screenHeight = math_half(uiRedux.screen.height);
    canvas.scrollTo({
      behavior: "smooth",
      top: canvasSpaceSize - screenHeight,
      left: canvasSpaceSize - screenWidth,
    });
  }

  function goLocationHandler() {
    const canvas = current(options.canvas);
    canvas.scrollTo({
      behavior: "smooth",
      top: input.y + 1,
      left: input.x + 1,
    });
  }

  function markLocationHandler() {
    const name = input.name;
    dispatch(
      setMarkLocation({
        name,
        x: input.x,
        y: input.y,
      })
    );
  }

  return (
    <MessageDialogBox ref={toolRef} h={326}>
      <Title value="Location" txtAli="center" />
      <Divider />
      <FieldWarper justify="space-between" py={10} px={15}>
        <InputField
          type="number"
          title="location-x-input"
          label="X"
          value={input.x}
          placeHolder="100..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, x: Math.trunc(parseInt(ev.target.value)) };
            });
          }}
        />
        <InputField
          type="number"
          title="location-y-input"
          label="Y"
          value={input.y}
          placeHolder="100..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, y: Math.trunc(parseInt(ev.target.value)) };
            });
          }}
        />
        <InputField
          type="text"
          title="location-name-input"
          label="N"
          value={input.name}
          placeHolder="L1..."
          onChange={(ev: any) => {
            setInput((i) => {
              return { ...i, name: ev.target.value };
            });
          }}
        />
      </FieldWarper>
      <FieldWarper direction="column" px={16} py={1}>
        <Button.Click
          r={7}
          style={{ width: "100%", height: "35px" }}
          listener={markLocationHandler}
        >
          <IconMapPin size={13} color="white" /> Mark
        </Button.Click>
        <LayerPane
          r={7}
          flowY={true}
          direction="column"
          h={100}
          className={CustomStyle.protoPenScrollbarPrimary}
          style={{
            margin: "5px 0",
            width: "100%",
            border: "1px solid #3d3d3d",
            borderRadius: "7px",
          }}
        >
          {markLocationList.length ? (
            <LocationList
              dataList={markLocationList}
              canvas={options.canvas}
              locationState={{
                markLocation: markLocationRedux.markLocation,
              }}
            />
          ) : (
            <NoLocationMarked />
          )}
        </LayerPane>
      </FieldWarper>
      <Divider />
      <FieldWarper direction="column" px={16} py={1}>
        <Button.Click
          r={7}
          style={{ width: "100%", height: "35px", marginTop: "5px" }}
          listener={goLocationHandler}
        >
          Go to {`${input.x},${input.y}`}
        </Button.Click>
        <Button.Click
          r={7}
          style={{ width: "100%", height: "35px", marginTop: "5px" }}
          listener={canvasCenterHandler}
        >
          Canvas Center
        </Button.Click>
      </FieldWarper>
    </MessageDialogBox>
  );
}

function NoLocationMarked() {
  return (
    <Button.Click
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: color.primary,
      }}
    >
      No location Marked!
    </Button.Click>
  );
}

type LocationListType = { name: string; x: number; y: number };

interface LocationListArgs {
  dataList: LocationListType[];
  canvas: any;
  locationState: {
    markLocation: any;
  };
}

function LocationList(options: LocationListArgs) {
  const dispatch = useAppDispatch();
  const style = {
    backgroundColor: color.primaryHalf,
    margin: "0 5px",
  };

  const locationList: LocationListType[] = options.dataList;

  return (
    <>
      {locationList.map((i, index) => {
        return (
          <FieldWarper direction="row" style={{ width: "100%" }} key={index}>
            <Button.Click w={180} h={25} r={7} style={style}>
              {i.name}
            </Button.Click>
            <Button.Click
              w={30}
              h={25}
              r={7}
              style={style}
              listener={() => {
                const canvas = options.canvas.current as unknown as HTMLElement;
                canvas.scrollTo({
                  behavior: "smooth",
                  top: i.y,
                  left: i.x,
                });
              }}
            >
              <IconCurrentLocation size={14} />
            </Button.Click>
            <Button.Click
              w={30}
              h={25}
              r={7}
              style={style}
              listener={() => {
                dispatch(deleteMarkLocation(i.name));
              }}
            >
              <IconSquareMinus size={14} />
            </Button.Click>
          </FieldWarper>
        );
      })}
    </>
  );
}
