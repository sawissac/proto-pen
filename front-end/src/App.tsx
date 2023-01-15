import "./App.css";
import { useEffect, useRef, useState } from "react";
import { Screen } from "./logic/detection";
import { LayerPane } from "./component/LayerPane";
import { Ui } from "./logic/UiDefaultValue";
import { MoveUtil, ScreenBoundaryDetection } from "@wauxstudio/element-move-js";
import { MainScreenPane } from "./component/MainScreen";
import { TestBox } from "./component/TestBox";

const screen = new Screen();

function App() {
  const mainScreenRef = useRef(null);
  const moveBoxRef = useRef(null);

  const [scrProp, setScrProp] = useState({
    width: screen.getWidth(),
    height: screen.getHeight(),
  });

  // for Screen responsive
  useEffect(() => {
    screen.listen((props) => {
      setScrProp((i) => {
        return {
          ...i,
          ...props,
        };
      });
    });

    const { boundary, detection } = ScreenBoundaryDetection(
      mainScreenRef.current as unknown as HTMLElement
    );
    const moveUtil = new MoveUtil({
      el: moveBoxRef.current as unknown as HTMLElement,
      boundary: boundary,
      detection: detection,
      pushBackDistance: 2,
    });

    return () => {
      moveUtil.closeEvent();
      screen.closeEvent();
    };
  }, []);

  return (
    <div className="App">
      <LayerPane height={scrProp.height} width={Ui.layerPane.width}></LayerPane>
      <MainScreenPane
        ref={mainScreenRef}
        width={scrProp.width}
        height={scrProp.height}
      >
        <TestBox ref={moveBoxRef} />
      </MainScreenPane>
      <LayerPane
        height={scrProp.height}
        width={Ui.ActionLayerPane.width}
      ></LayerPane>
      <LayerPane height={scrProp.height} width={Ui.layerPane.width}></LayerPane>
    </div>
  );
}

export default App;
