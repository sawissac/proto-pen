import { Alert, Box, Stack } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../logic/redux-store/hooks";
import { _obj_value } from "../../logic/proto_pen_method/proto_obj_extract";
import { ComponentModel } from "../../logic/ComponentModel";
import ShowIf from "../helper/ShowIf";
import CustomInput from "./CssNameListCustomInput";
import { blue } from "@mui/material/colors";

function CssNameList() {
  const elementObjRedux = useAppSelector((s) => s.object);

  const nodeModelList = _obj_value(elementObjRedux.elementObjectData).filter(
    (i: any) => i.type === ComponentModel.nm
  );

  return (
    <React.Fragment>
      <ShowIf
        sif={nodeModelList.length === 0}
        show={<Alert severity="info">No css created!</Alert>}
      />
      <ShowIf
        sif={nodeModelList.length > 0}
        show={
          <Stack
            className={"scroll-invisible"}
            sx={{
              overflowY: "scroll",
              height: 130,
              border: "1px solid " + blue[600],
            }}
          >
            {nodeModelList.map((i: any, key) => {
              return (
                <CustomInput
                  key={key}
                  id={i.name}
                  value={i.text}
                  focused={i.name === elementObjRedux.activeNode}
                />
              );
            })}
          </Stack>
        }
      />
    </React.Fragment>
  );
}

export default CssNameList;
