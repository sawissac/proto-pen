import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./logic/redux-store/hooks";
import { changeScreen } from "./logic/redux-store/feature/UserInterfaceSlice";
import AppFrame from "./comV2/com-app-frame/AppFrame";
import { Disabler } from "./comV2/helper/Disabler";
import GetContainerSize from "./comV2/helper/GetContainerSize";
import ShowIf from "./comV2/helper/ShowIf";
import LayerControl from "./comV2/com-layer-control/LayerControl";
import HtmlCanvas from "./comV2/com-html-canvas/HtmlCanvas";
import ActionPane from "./comV2/com-action-pane/ActionPane";
import Message from "./comV2/com-message/Message";
import NewElementTool from "./comV2/com-tools/com-new-element/NewElementTool";
import MoveTool from "./comV2/com-tools/com-move/MoveTool";
import ArrangeTool from "./comV2/com-tools/com-arrange/ArrangeTool";
import GroupTool from "./comV2/com-tools/com-group/GroupTool";
import LocationTool from "./comV2/com-tools/com-location/LocationTool";
import PropertyTool from "./comV2/com-tools/com-property/PropertyTool";
import { blue, grey } from "@mui/material/colors";
import PropertyPane from "./comV2/com-property-pane/PropertyPane";
import ColorPaletteTool from "./comV2/com-tools/com-color-palette/ColorPalette";
import CommandTool from "./comV2/com-tools/com-command/Command";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blue[600],
    },
  },
  components: {
    MuiStack: {
      defaultProps: {
        bgcolor: grey[900],
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: grey[900]
        }
      },
    },
    MuiList: {
      styleOverrides:{
        root: {
          fontSize: 14,
          color: grey[200],
          paddingTop: 1,
          paddingBottom: 1
        }
      }
    },
    MuiAlert: {
      styleOverrides:{
        root: {
          fontSize: 14
        }
      }
    }
  },
});

function AppV2() {
  const ToolRedux = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();
  const appFrameRef = React.useRef(null);
  const onResizeFinished = (size: any) => {
    dispatch(
      changeScreen({
        screen: size,
      })
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={darkTheme}>
        <AppFrame ref={appFrameRef}>
          <GetContainerSize
            target={appFrameRef}
            onResizeFinished={onResizeFinished}
          >
            <Disabler.Wheel target={appFrameRef}>
              <LayerControl />
              <HtmlCanvas />
              <ActionPane />
              <PropertyPane />
              <Message />
              <ShowIf
                sif={ToolRedux.newElementTool.state}
                show={<NewElementTool />}
              />
              <ShowIf sif={ToolRedux.moveTool.state} show={<MoveTool />} />
              <ShowIf
                sif={ToolRedux.locationTool.state}
                show={<LocationTool />}
              />
              <ShowIf
                sif={ToolRedux.arrangeTool.state}
                show={<ArrangeTool />}
              />
              <ShowIf sif={ToolRedux.groupTool.state} show={<GroupTool />} />
              <ShowIf
                sif={ToolRedux.propertyTool.state}
                show={<PropertyTool />}
              />
              <ShowIf
                sif={ToolRedux.colorPaletteTool.state}
                show={<ColorPaletteTool />}
              />
              <ShowIf
                sif={ToolRedux.noteBookTool.state}
                show={<CommandTool />}
              />
            </Disabler.Wheel>
          </GetContainerSize>
        </AppFrame>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default AppV2;
