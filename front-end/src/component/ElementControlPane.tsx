import { LayerPane } from "./LayerPane";
import CustomStyles from "../custom.module.css";
import { useAppDispatch, useAppSelector } from "../logic/redux-store/hooks";
import { setActiveElement } from "../logic/redux-store/feature/ElementObjectSlice";
import { Button } from "./io-component/Button";

export function ElementControlPane() {
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);
  const elementObjectRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();

  const selectedElementList = elementObjectRedux.selectedElement;
  const elementList = Object.values(elementObjectRedux.elementObjectData);
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
              backgroundColor:
                activeElement === i.name
                  ? "#2183e9"
                  : selectedElement.has(i.name)
                  ? "#8521e9"
                  : "transparent",
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
