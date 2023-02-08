import React from "react";
import { FieldWarper } from "../io-component/InputField";
import { border } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";
import { Title } from "../io-component/ToolBox";
import { Button } from "../io-component/Button";
import { IconCopy } from "@tabler/icons-react";
import { useAppDispatch } from "../../logic/redux-store/hooks";
import { duplicateElementObject } from "../../logic/redux-store/feature/ElementObjectSlice";

function ControlPaneControl() {
  const dispatch = useAppDispatch();
  return (
    <FieldWarper px={1} py={1} direction="column">
      <FieldWarper
        px={1}
        py={1}
        direction="row"
        style={{
          borderBottom: border(color.primaryHalf),
          width: "180px",
          height: "40px",
          paddingLeft: "5px",
          marginBottom: "5px",
        }}
      >
        <Title value="Css" txtAli="left" />
        <div style={{ flex: 1 }}></div>
        <Button.Click
          w={40}
          h={38}
          px={1}
          py={1}
          primary
          listener={() => {
            dispatch(duplicateElementObject());
          }}
        >
          <IconCopy size={14} />
        </Button.Click>
      </FieldWarper>
    </FieldWarper>
  );
}

export default ControlPaneControl;
