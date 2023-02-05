import "./App.css";
import { useEffect, useRef } from "react";
import { ScreenDetection } from "./logic/screen_detection";
import { ActionPane } from "./component/ActionPane";
import { ScreenPane } from "./component/htmlCanvasPane/ScreenPane";
import { NewElementTool } from "./component/tools/NewElementTool";
import { ElementControlPane } from "./component/ElementControlPane";
import { LocationTool } from "./component/tools/LocationTool";
import { current } from "./logic/proto_pen_method/proto_event";
import { MoveTool } from "./component/tools/MoveTool";
import { ArrangeTool } from "./component/tools/ArrangeTool";
import { useAppDispatch, useAppSelector } from "./logic/redux-store/hooks";
import { changeScreen } from "./logic/redux-store/feature/UserInterfaceSlice";
import { PropertyTool } from "./component/tools/PropertyTool";
import { GroupTool } from "./component/tools/GroupTool";
import {
  disableWheelEvent,
  removeDisableWheelEvent,
} from "./logic/disableEvent";
import MessageDialog from "./component/MessageDialog";
import { setActiveElement, setSelectedElement } from "./logic/redux-store/feature/ElementObjectSlice";
import { ElementPropertyPane } from "./component/PropertyPane/ElementPropertyPane";

const screenDetection = new ScreenDetection();

function App() {
  const ToolRedux = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();

  const appInterfaceRef = useRef(null);
  const canvasRef = useRef(null);

  //! for Screen responsive
  useEffect(() => {
    const appInterface = current(appInterfaceRef);

    function getScreenSize() {
      dispatch(
        changeScreen({
          screen: screenDetection.getBoth(),
        })
      );
    }
    getScreenSize();

    disableWheelEvent(appInterface);
    screenDetection.listener(() => {
      getScreenSize();
    });

    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
      dispatch(setActiveElement(""));
      dispatch(setSelectedElement([]))
    }, false);

    return () => {
      removeDisableWheelEvent(appInterface);
      screenDetection.closeEvent();
    };
  }, []);

  return (
    <div ref={appInterfaceRef} className="App">
      <ElementControlPane />
      <ScreenPane ref={canvasRef} />
      <ActionPane />
      <ElementPropertyPane />
      {ToolRedux.newElementTool.state ? (
        <NewElementTool parent={appInterfaceRef} />
      ) : null}
      {ToolRedux.locationTool.state ? (
        <LocationTool parent={appInterfaceRef} canvas={canvasRef} />
      ) : null}
      {ToolRedux.moveTool.state ? <MoveTool parent={appInterfaceRef} /> : null}
      {ToolRedux.arrangeTool.state ? (
        <ArrangeTool parent={appInterfaceRef} />
      ) : null}
      {ToolRedux.propertyTool.state ? (
        <PropertyTool parent={appInterfaceRef} />
      ) : null}
      {ToolRedux.groupTool.state ? (
        <GroupTool parent={appInterfaceRef} />
      ) : null}
      <MessageDialog />
    </div>
  );
}

export default App;
