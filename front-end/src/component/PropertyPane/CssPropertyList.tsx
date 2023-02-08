import React from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { FieldWarper, InputField } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import {
  IconCheck,
  IconCopy,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { border } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";
import { Title } from "../io-component/ToolBox";
import {
  createNode,
  duplicateNode,
  removeNode,
  renameNode,
  setActiveNode,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import { ProtoPenElement } from "../../logic/proto_pen_method/proto_create_element";
import { SelectDataEnum } from "../tools/PropertyTool";
import CustomStyle from "../../custom.module.css";
import Description from "../io-component/Description";
import { LayerPane } from "../LayerPane";

function CssPropertyList() {
  const elementObjectRedux = useAppSelector((s) => s.elementObject);
  const dispatch = useAppDispatch();
  const [input, setInput] = React.useState(false);
  const [name, setName] = React.useState("");

  function getNodeModelType(data: { [x: string]: ProtoPenElement }) {
    const res: any = {};
    Object.values(data)
      .filter((i) => i.type === SelectDataEnum.nm)
      .map((i) => {
        res[i.name] = i.text;
      });
    return res;
  }

  const nodeElementList = getNodeModelType(
    elementObjectRedux.elementObjectData
  );

  return (
    <FieldWarper px={1} py={1} direction="column">
      <FieldWarper
        px={1}
        py={1}
        direction="row"
        style={{
          borderBottom: border(color.primaryHalf),
          width: "230px",
          height: "40px",
          paddingLeft: "5px",
          marginBottom: "5px",
        }}
      >
        <Title value="Css" txtAli="left" />
        <div style={{ flex: 1 }}></div>
        {!input ? (
          <Button.Click
            w={40}
            h={38}
            px={1}
            py={1}
            primary
            listener={() => {
              if (elementObjectRedux.activeNode)
                dispatch(duplicateNode(elementObjectRedux.activeNode));
            }}
          >
            <IconCopy size={14} />
          </Button.Click>
        ) : null}
        {!input ? (
          <Button.Click
            w={40}
            h={38}
            px={1}
            py={1}
            primary
            listener={() => {
              setInput(true);
            }}
          >
            <IconPlus size={14} />
          </Button.Click>
        ) : null}
        {name ? (
          <Button.Click
            w={40}
            h={38}
            px={1}
            py={1}
            primary
            listener={() => {
              dispatch(
                createNode({
                  name,
                })
              );
              setName("");
              setInput(false);
            }}
          >
            <IconCheck size={14} />
          </Button.Click>
        ) : null}
        {name.length === 0 && input ? (
          <Button.Click
            w={40}
            h={38}
            px={1}
            py={1}
            primary
            listener={() => {
              setInput(false);
            }}
          >
            <IconX size={14} />
          </Button.Click>
        ) : null}
        <Button.Click
          w={40}
          h={38}
          px={1}
          py={1}
          primary
          listener={() => {
            dispatch(removeNode(elementObjectRedux.activeNode));
            dispatch(setActiveNode(""));
          }}
        >
          <IconTrash size={14} />
        </Button.Click>
      </FieldWarper>
      {input ? (
        <FieldWarper px={1} py={10}>
          <InputField
            label="Css name"
            placeHolder="Name..."
            labelWidth={66}
            style={{ width: "140px" }}
            value={name}
            onEnter={(ev: any) => {
              if (ev.key === "Enter") {
                dispatch(
                  createNode({
                    name,
                  })
                );
                setName("");
                setInput(false);
              }
            }}
            onChange={(ev: any) => {
              setName(ev.target.value);
            }}
          />
        </FieldWarper>
      ) : null}

      <LayerPane
        direction="column"
        justify="flex-start"
        flowY
        h={150}
        w={225}
        r={7}
        className={CustomStyle.protoPenScrollbarPrimary}
      >
        {Object.keys(nodeElementList).length === 0 ? (
          <FieldWarper>
            <Description value="No css node created!" h={150} />
          </FieldWarper>
        ) : null}
        {Object.keys(nodeElementList).map((i, index) => {
          return (
            <Button.DoubleClickInput
              key={index}
              style={{
                width: "215px",
                minHeight: "40px",
                borderBottom: border(color.primaryHalf),
                paddingLeft: "14px",
                textAlign: "left",
                backgroundColor:
                  elementObjectRedux.activeNode === i
                    ? color.secondary
                    : color.primary,
              }}
              className={CustomStyle.placeHolder}
              inputPlaceHolder="Rename..."
              primary
              listener={() => {
                dispatch(setActiveNode(i));
              }}
              onChange={(value: string) => {
                dispatch(renameNode(value));
              }}
            >
              {nodeElementList[i]}
            </Button.DoubleClickInput>
          );
        })}
      </LayerPane>
    </FieldWarper>
  );
}

export default CssPropertyList;
