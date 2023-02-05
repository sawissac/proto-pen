import CustomStyles from "../custom.module.css";
import { LayerPane } from "./LayerPane";
import { useAppDispatch, useAppSelector } from "../logic/redux-store/hooks";
import { setActiveElement } from "../logic/redux-store/feature/ElementObjectSlice";
import { Button } from "./io-component/Button";
import { background } from "../logic/theme/property";
import { SelectDataEnum } from "./tools/PropertyTool";

export function ElementControlPane() {
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);
  const elementObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();

  const selectedElementList = elementObjectRedux.selectedElement;
  const elementList = Object.values(elementObjectRedux.elementObjectData).filter(i => i.type !== SelectDataEnum.nm);
  const activeElement = elementObjectRedux.activeElement;
  const selectedElement = new Set(selectedElementList);
  
  return (
    <LayerPane
      className={CustomStyles.protoPenScrollbarPrimary}
      w={userInterfaceRedux.controlPaneWidth}
      h={userInterfaceRedux.screen.height}
      direction="column"
      justify="flex-start"
      flowY={true}
    >
      {elementList.map((i, index) => {
        return (
          <Button.Click
            key={index}
            h={35}
            style={{
              width: "100%",
              backgroundColor: background(
                activeElement === i.name,
                selectedElement.has(i.name)
              ),
            }}
            listener={() => {
              dispatch(setActiveElement(i.name));
            }}
          >
            {i.name}
          </Button.Click>
        );
      })}
    </LayerPane>
  );
}
