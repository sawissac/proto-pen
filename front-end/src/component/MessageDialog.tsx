import React from "react";
import { useAppSelector } from "../logic/redux-store/hooks";
import { _if, setPx } from "../logic/theme/property";
import { color } from "../logic/theme/color";
import { FieldWarper } from "./io-component/InputField";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconQuestionMark,
} from "@tabler/icons-react";

function MessageDialog() {
  const userInterfaceRedux = useAppSelector((state) => state.userInterface);
  const { type, message } = userInterfaceRedux.messageDialog;
  const style: React.CSSProperties = {
    width: setPx(userInterfaceRedux.canvasWidth),
    bottom: setPx(0),
    left: setPx(200),
    height: setPx(30),
    backgroundColor: color.primary,
    position: "fixed",
    fontSize: setPx(14),
  };

  return (
    <div style={style}>
      <FieldWarper
        px={15}
        py={0}
        justify="flex-start"
        align="center"
        style={{
          width: "max-content",
          backgroundColor: _if(
            type,
            "success",
            color.secondary,
            _if(type, "warning", color.purple, color.primary)
          ),
        }}
      >
        {type === "success" ? (
          <IconCircleCheck size={14} />
        ) : type === "warning" ? (
          <IconAlertTriangle size={14} />
        ) : (
          <IconQuestionMark size={14} />
        )}
        <div style={{ marginLeft: setPx(5), height: "max-content" }}>
          {userInterfaceRedux.messageDialog.message}
        </div>
      </FieldWarper>
    </div>
  );
}

export default MessageDialog;
