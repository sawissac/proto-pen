import React from "react";
import { FieldWarper } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { useMoveUtilForTool } from "../../logic/hooks/ToolMoveHook";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { changeToolsPos } from "../../logic/redux-store/feature/ToolSlice";
import { setElementPosMulti } from "../../logic/redux-store/feature/ElementObjectSlice";
import { Divider, ToolBox, Title } from "../io-component/ToolBox";
import { setMessage } from "../../logic/redux-store/feature/UserInterfaceSlice";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { vscodeDark } from "@uiw/codemirror-themes-all";
interface NewLayerDialogArgs {
  parent: any;
}

export function NoteBookTool(options: NewLayerDialogArgs) {
  const toolRedux = useAppSelector((state) => state.tool);
  const elObjRedux = useAppSelector((state) => state.elementObject);
  const dispatch = useAppDispatch();

  const toolRef = React.useRef(null);
  const [note, setNote] = React.useState("");
  useMoveUtilForTool(
    toolRef,
    options.parent,
    toolRedux.noteBookTool.position,
    changeToolsPos,
    "noteBookTool",
    []
  );
  const onChange = React.useCallback((value: string) => {
    setNote(value);
  }, []);

  return (
    <ToolBox ref={toolRef} h={400} w={400} style={{ overflow: "hidden" }}>
      <Title value="Note Book" txtAli="center" />
      <Divider />
      <CodeMirror
        value={note}
        style={{ fontSize: "14px" }}
        height="365px"
        theme={vscodeDark}
        extensions={[langs.tsx(), langs.html(), langs.css(), langs.php()]}
        onChange={onChange}
        placeholder={"Let's take a note!"}
      />
    </ToolBox>
  );
}
