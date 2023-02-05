import CustomStyles from "../../custom.module.css";
import { LayerPane } from "../LayerPane";
import { Button } from "../io-component/Button";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { Divider, Title } from "../io-component/ToolBox";
import { FieldWarper, InputField, SelectBox } from "../io-component/InputField";
import { CssProperty } from "../../logic/css-properties";
import { camelCase } from "lodash";
import { color } from "../../logic/theme/color";
import { border, setPx } from "../../logic/theme/property";
import Description from "../io-component/Description";
import {
  disconnectCssSharedChild,
  sharedCss,
  updateCssProps,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import {
  IconArrowAutofitContent,
  IconArrowAutofitDown,
  IconArrowAutofitRight,
  IconBorderRadius,
  IconBorderStyle,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignRight,
  IconPill,
  IconShadow,
  IconSquareMinus,
} from "@tabler/icons-react";
import { SelectDataEnum } from "../tools/PropertyTool";
import React from "react";
import CssPropertyList from "./CssPropertyList";
import PropertyTable from "./PropertyTable";

export function ElementPropertyPane() {
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);
  const { elementObjectData, activeElement, activeNode } = useAppSelector(
    (state) => state.elementObject
  );
  const dispatch = useAppDispatch();

  const [cssValue, setCssValue] = React.useState("");
  const [cssPropSelectBox, setCssPropSelectBox] = React.useState("");
  const [child, setChild] = React.useState([]);

  function PropTitle(props: { name: string }) {
    return (
      <FieldWarper
        justify="flex-start"
        direction="row"
        style={{
          width: "100%",
          height: "40px",
          paddingLeft: "5px",
          borderBottom: border(color.primaryHalf),
        }}
      >
        <Title value={props.name} txtAli="left" />
      </FieldWarper>
    );
  }

  return (
    <LayerPane
      className={CustomStyles.protoPenScrollbarPrimary}
      w={userInterfaceRedux.propertyPaneWidth}
      h={userInterfaceRedux.screen.height}
      direction="column"
      justify="flex-start"
      flowY={true}
    >
      <CssPropertyList />
      <PropTitle name="Use Css" />
      {activeElement && activeNode ? (
        <FieldWarper
          px={5}
          py={7}
          justify="flex-start"
          direction="row"
          style={{
            width: "100%",
          }}
        >
          {Object.hasOwn(
            elementObjectData[activeElement].className,
            activeNode
          ) ? (
            <Button.Click
              r={7}
              style={{ width: "100%", height: "40px" }}
              listener={() => {
                dispatch(
                  disconnectCssSharedChild({
                    activeEl: activeNode,
                    deleteName: activeElement,
                  })
                );
              }}
            >
              Remove
            </Button.Click>
          ) : (
            <Button.Click
              r={7}
              style={{ width: "100%", height: "40px" }}
              listener={() => {
                const cssSharedChild = {
                  ...elementObjectData[activeNode].cssSharedChild,
                  [activeElement]: "shared",
                };
                dispatch(
                  sharedCss({
                    activeEl: activeNode,
                    cssSharedChild: cssSharedChild,
                  })
                );
              }}
            >
              Apply
            </Button.Click>
          )}
        </FieldWarper>
      ) : null}
      <PropTitle name="Quick Action" />
      {activeNode.length ? (
        <QuickAction
          setCss={(cssData: React.CSSProperties) => {
            const css = {
              ...elementObjectData[activeNode].css,
              ...cssData,
            };
            dispatch(
              updateCssProps({
                activeEl: activeNode,
                css,
              })
            );
          }}
        />
      ) : null}
      <PropTitle name="Manual" />
      {activeNode.length ? (
        <FieldWarper
          px={0}
          py={5}
          direction="column"
          style={{
            width: "240px",
          }}
        >
          <SelectBox
            dataSet={Object.keys(CssProperty)}
            sLaW={80}
            sBW={136}
            seLaW={70}
            searchBox={true}
            label="Property"
            onChange={(value: any) => {
              setCssPropSelectBox(value);
            }}
          />
          <InputField
            label="Value"
            labelWidth={75}
            style={{ width: "136px", textAlign: "center", marginTop: "7px" }}
            value={cssValue}
            onChange={(ev: any) => {
              setCssValue(ev.target.value);
            }}
            onEnter={(ev: any) => {
              if (ev.key === "Enter") {
                const css = {
                  ...elementObjectData[activeNode].css,
                  [camelCase(cssPropSelectBox)]: cssValue,
                };
                dispatch(
                  updateCssProps({
                    activeEl: activeNode,
                    css,
                  })
                );
                setCssValue("");
              }
            }}
          />
        </FieldWarper>
      ) : null}

      <PropTitle name="Css property" />
      {activeNode.length > 0 ? (
        <PropertyTable
          idW={100}
          vW={56}
          dW={45}
          data={elementObjectData[activeNode].css}
          defaultValue="No css value is set!"
          onDelete={(value: any) => {
            const copy: any = {
              ...elementObjectData[activeNode].css,
            };
            delete copy[value];

            dispatch(
              updateCssProps({
                activeEl: activeNode,
                css: copy,
              })
            );
          }}
        />
      ) : null}
    </LayerPane>
  );
}

// {activeElement ? (
//         <div style={{ paddingBottom: "7px" }}>
//           <Title value="Node Model" />
//           <Divider />
//           <FieldWarper px={16} py={5}>
//             <Button.Click
//               r={7}
//               h={35}
//               style={{ width: "100%" }}
//               listener={() => {
//                 dispatch(
//                   duplicateElement({
//                     activeElement: data.name,
//                     canvasSpace: userInterfaceRedux.canvasSpaceSize,
//                   })
//                 );
//               }}
//             >
//               Duplicate
//             </Button.Click>
//           </FieldWarper>
//           <Divider />
//           <Title value="Shared Child" />
//           <Divider />
//           <FieldWarper px={0} py={5} direction="column">
//             <SelectBox
//               direct={child}
//               sLaW={93}
//               sBW={136}
//               seLaW={97}
//               label="Child"
//               onChange={(value: any) => {
//                 const cssSharedChild = {
//                   ...elementObjectRedux.elementObjectData[data.name]
//                     .cssSharedChild,
//                   [value]: "shared",
//                 };
//                 dispatch(
//                   sharedCss({
//                     activeEl: data.name,
//                     cssSharedChild: cssSharedChild,
//                   })
//                 );
//               }}
//               onClick={() => {
//                 const elementObjectReduxbjectDataList = Object.values(
//                   elementObjectRedux.elementObjectData
//                 );
//                 const listWithOutNodeModel: any =
//                   elementObjectReduxbjectDataList.reduce((p: string[], c) => {
//                     if (c.type !== SelectDataEnum.nm) {
//                       p.push(c.name);
//                     }
//                     return p;
//                   }, []);
//                 setChild(listWithOutNodeModel);
//               }}
//             />
//           </FieldWarper>
//           <FlexTable
//             idW={95}
//             vW={86}
//             dW={45}
//             data={
//               elementObjectRedux.elementObjectData[data.name].cssSharedChild
//             }
//             defaultValue="No Child is shared!"
//             onDelete={(value: any) => {
//               dispatch(
//                 disconnectCssSharedChild({
//                   activeEl: data.name,
//                   deleteName: value,
//                 })
//               );
//             }}
//           />
//           <Divider />
//           <FieldWarper px={0} py={5} direction="column">
//             <SelectBox
//               dataSet={Object.keys(CssProperty)}
//               sLaW={93}
//               sBW={136}
//               seLaW={86}
//               searchBox={true}
//               label="Property"
//               onChange={(value: any) => {
//                 setCssPropSelectBox(value);
//               }}
//             />
//           </FieldWarper>
//           <FieldWarper direction="column" px={16} py={5}>
//             <InputField
//               label="Value"
//               labelWidth={150}
//               style={{ width: "100%", textAlign: "center", marginTop: "7px" }}
//               value={cssValue}
//               onChange={(ev: any) => {
//                 setCssValue(ev.target.value);
//               }}
//             />
//           </FieldWarper>
//           {cssPropSelectBox ? (
//             <FieldWarper direction="column" px={16} py={5}>
//               <Description
//                 h={"max-content"}
//                 value={CssProperty[cssPropSelectBox].syntax}
//                 border
//               />
//             </FieldWarper>
//           ) : null}
//           <FieldWarper px={16} py={5}>
//             <Button.Click
//               r={7}
//               h={35}
//               style={{ width: "100%" }}
//               listener={() => {
//                 const css = {
//                   ...elementObjectRedux.elementObjectData[data.name].css,
//                   [camelCase(cssPropSelectBox)]: cssValue,
//                 };
//                 dispatch(
//                   updateCssProps({
//                     activeEl: data.name,
//                     css,
//                   })
//                 );
//               }}
//             >
//               Set
//             </Button.Click>
//           </FieldWarper>
//           <Divider />
//           <Title value="Quick Action" />
//           <Divider />
//           <QuickAction
//             setCss={(cssData: React.CSSProperties) => {
//               const css = {
//                 ...elementObjectRedux.elementObjectData[data.name].css,
//                 ...cssData,
//               };
//               dispatch(
//                 updateCssProps({
//                   activeEl: data.name,
//                   css,
//                 })
//               );
//             }}
//           />
//           <Divider />
//           <Title value="CSS Props" />
//           <FlexTable
//             idW={95}
//             vW={86}
//             dW={45}
//             data={elementObjectRedux.elementObjectData[data.name].css}
//             defaultValue="No value is set!"
//             onDelete={(value: any) => {
//               const copy: any = {
//                 ...elementObjectRedux.elementObjectData[data.name].css,
//               };
//               delete copy[value];
//               dispatch(
//                 updateCssProps({
//                   activeEl: data.name,
//                   css: copy,
//                 })
//               );
//             }}
//           />
//         </div>
//       ) : null}

interface QuickActionInterface {
  setCss: any;
}

function QuickAction(options: QuickActionInterface) {
  type QuickActionList = {
    [x: string]: { icon: any; style: React.CSSProperties };
  };

  const QuickActionList1: QuickActionList = {
    alignLeft: {
      icon: IconLayoutAlignLeft,
      style: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
    alignCenter: {
      icon: IconLayoutAlignCenter,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    alignRight: {
      icon: IconLayoutAlignRight,
      style: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },
    directionColumn: {
      icon: IconArrowAutofitDown,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
    directionRow: {
      icon: IconArrowAutofitRight,
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
  };
  const QuickActionList2: QuickActionList = {
    maxWidthHight: {
      icon: IconArrowAutofitContent,
      style: {
        width: "max-content",
        height: "max-content",
      },
    },
    borderRounded: {
      icon: IconBorderRadius,
      style: {
        borderRadius: "7px",
      },
    },
    borderFlat: {
      icon: IconBorderStyle,
      style: {
        borderRadius: "0px",
      },
    },
    borderPill: {
      icon: IconPill,
      style: {
        borderRadius: "9999px",
      },
    },
    shadow: {
      icon: IconShadow,
      style: {
        boxShadow: "0 2px 3px 1px " + color.shadow,
      },
    },
  };

  function generateQAList(QuickActionList: QuickActionList) {
    return Object.keys(QuickActionList).map((listName, index) => {
      const Style = QuickActionList[listName].style;
      const Icon = QuickActionList[listName].icon;
      return (
        <Button.Click
          key={index}
          w={31}
          h={31}
          r={7}
          style={{
            border: border(color.primaryHalf),
            marginLeft: "5px",
            backgroundColor: color.primary,
          }}
          listener={() => {
            options.setCss(Style);
          }}
        >
          <Icon size={14} />
        </Button.Click>
      );
    });
  }
  return (
    <FieldWarper py={5} px={16} direction="column">
      <FieldWarper py={5} px={0}>
        {generateQAList(QuickActionList1)}
      </FieldWarper>
      <FieldWarper py={5} px={0}>
        {generateQAList(QuickActionList2)}
      </FieldWarper>
    </FieldWarper>
  );
}
