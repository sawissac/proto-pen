import { Box, TextField } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";
import { useAppDispatch } from "../../logic/redux-store/hooks";
import { renameNode, setActiveNode } from "../../logic/redux-store/feature/ElementObjectSlice";
import ShowIf from "../helper/ShowIf";

function CustomInput(props: { value: string; focused?: boolean; id: string }) {
  const dispatch = useAppDispatch();
  const [inputChange, setInputChange] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    setValue(props.value);
  }, [inputChange]);
  
  return (
    <React.Fragment>
      <ShowIf
        sif={!inputChange}
        show={
          <Box
            component="div"
            display={"flex"}
            flexDirection={"row"}
            py={1}
            px={2}
            sx={{
              fontSize: 14,
              color: grey[200],
              bgcolor: props.focused ? blue[600] : grey[900],
              transitionDuration: "0.3s",
              "&:hover": {
                bgcolor: props.focused ? blue[800] : grey[800],
              },
              "&:active": {
                bgcolor: props.focused ? blue[700] : grey[900],
              },
            }}
            onClick={() => {
              dispatch(setActiveNode(props.id));
            }}
            onDoubleClick={() => {
              setInputChange(true);
            }}
          >
            {props.value}
          </Box>
        }
      />
      <ShowIf
        sif={inputChange}
        show={
          <TextField
            size="small"
            value={value}
            sx={{
              fontSize: 14,
              color: grey[200],
              bgcolor: props.focused ? blue[600] : grey[900],
              transitionDuration: "0.3s",
              "&:hover": {
                bgcolor: props.focused ? blue[800] : grey[800],
              },
              "&:active": {
                bgcolor: props.focused ? blue[700] : grey[900],
              },
            }}
            onChange={(ev: any) => {
              setValue(ev.target.value)
            }}
            onKeyDown={(ev:any)=>{
              if (ev.key === "Enter") {
                dispatch(renameNode(value));
                setInputChange(false);
              }
            }}
          >
            {props.value}
          </TextField>
        }
      />
    </React.Fragment>
  );
}

export default CustomInput;
