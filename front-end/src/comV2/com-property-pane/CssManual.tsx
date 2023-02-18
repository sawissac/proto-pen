import {
  Alert,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ShowIf from "../helper/ShowIf";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import CustomInput from "./CssManualCustomInput";
import { blue, grey } from "@mui/material/colors";
import { CssProperty } from "../../logic/CssProperty";
import {
  _obj_key,
  _obj_value,
} from "../../logic/proto_pen_method/proto_obj_extract";
import { debounce } from "lodash";
import camelcase from "camelcase";
import { updateCssProps } from "../../logic/redux-store/feature/ElementObjectSlice";

function CssManual() {
  const { elementObjectData, activeElement, activeNode } = useAppSelector(
    (s) => s.object
  );
  const dispatch = useAppDispatch();
  const [property, setProperty] = React.useState("");
  const [value, setValue] = React.useState("");

  const [filteredData, setFilteredData] = React.useState<any>([]);
  const [show, setShow] = React.useState(false);
  const cssDataSet = _obj_key(CssProperty);

  const lazyInputHandler = React.useCallback(
    debounce((inputValue) => {
      if (cssDataSet.includes(inputValue)) {
        setShow(false);
      } else {
        const list = cssDataSet.filter((i: any) => i.includes(inputValue));
        setShow(true);
        setFilteredData(list);
      }
    }, 500),
    []
  );

  const handlePropertySearch = (ev: any) => {
    setProperty(ev.target.value);
    lazyInputHandler(ev.target.value);
  };

  const handleValue = (ev: any) => {
    setValue(ev.target.value);
  };

  return (
    <React.Fragment>
      <List dense>
        <ListItem>
          <ListItemText primary="Manual" />
        </ListItem>
      </List>
      <Divider />
      <ShowIf
        sif={(!activeElement && !activeNode) || (!activeElement && activeNode)}
        show={<Alert severity="info">Select Element!</Alert>}
      />
      <ShowIf
        sif={activeElement && !activeNode}
        show={<Alert severity="info">Create Css Node!</Alert>}
      />
      <ShowIf
        sif={activeElement && activeNode}
        show={
          <Box px={2} py={1}>
            <TextField
              variant="standard"
              label="Property"
              focused
              value={property}
              sx={{
                width: "100%",
                "& .MuiInputLabel-root.Mui-focused": { color: "grey.200" },
                "& .MuiInputBase-input": {
                  color: "grey.200",
                  fontSize: 14,
                },
              }}
              onChange={handlePropertySearch}
              placeholder="Write Property..."
            />
          </Box>
        }
      />

      <ShowIf
        sif={property.length > 0 && show}
        show={
          <React.Fragment>
            <Typography
              component={"div"}
              color={grey[200]}
              px={2}
              py={1}
              fontSize={12}
            >
              Property Name List
            </Typography>
            <ShowIf
              sif={filteredData.length === 0}
              show={<Alert severity="info">Property doesn't exist!</Alert>}
            />
            <ShowIf
              sif={filteredData.length > 0}
              show={
                <Stack
                  className={"default-scrollbar default-scrollbar-flat"}
                  sx={{
                    overflowY: "scroll",
                    height: 130,
                    border: "1px solid " + blue[600],
                  }}
                >
                  {filteredData.map((i: any, index: any) => (
                    <CustomInput
                      key={index}
                      value={i}
                      onClick={(v: string) => {
                        setProperty(v);
                        setShow(false);
                      }}
                    />
                  ))}
                </Stack>
              }
            />
          </React.Fragment>
        }
      />
      <ShowIf
        sif={!show && activeElement && activeNode && property}
        show={
          <Box px={2} py={1}>
            <TextField
              variant="standard"
              label="Value"
              focused
              value={value}
              sx={{
                width: "100%",
                "& .MuiInputLabel-root.Mui-focused": { color: "grey.200" },
                "& .MuiInputBase-input": {
                  color: "grey.200",
                  fontSize: 14,
                },
              }}
              onChange={handleValue}
              placeholder="Write Value..."
            />
          </Box>
        }
      />
      <ShowIf
        sif={!show && property && value}
        show={
          <Box px={2} py={1}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => {
                const css = {
                  ...elementObjectData[activeNode].css,
                  [camelcase(property)]: value,
                };
                dispatch(
                  updateCssProps({
                    activeEl: activeNode,
                    css,
                  })
                );
                setValue("");
                setProperty("");
              }}
            >
              ADD
            </Button>
          </Box>
        }
      />
    </React.Fragment>
  );
}

export default CssManual;
