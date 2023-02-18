import React from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import Stack from "@mui/material/Stack";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { IconCopy } from "@tabler/icons-react";
import {
  duplicateElementObject,
  setActiveElement,
} from "../../logic/redux-store/feature/ElementObjectSlice";
import Divider from "@mui/material/Divider";
import { blue, grey, purple } from "@mui/material/colors";
import { motion } from "framer-motion";
import { ComponentModel } from "../../logic/ComponentModel";
import { _obj_value } from "../../logic/proto_pen_method/proto_obj_extract";

function LayerControl() {
  const UiRedux = useAppSelector((s) => s.ui);
  const elementObjRedux = useAppSelector((s) => s.object);

  const dispatch = useAppDispatch();
  const activeElement = elementObjRedux.activeElement;
  const selectedElementList = elementObjRedux.selectedElement;
  const elementObjData = elementObjRedux.elementObjectData;

  const elementList = _obj_value(elementObjData).filter(
    (i: any) => i.type !== ComponentModel.nm
  );
  const selectedElement = new Set(selectedElementList);
  const sortedByLayer = elementList.sort((a: any, b: any) => b.layer - a.layer);

  return (
    <Stack
      direction="column"
      className="default-scrollbar"
      style={{
        width: UiRedux.controlPaneWidth,
        height: UiRedux.screen.height,
        overflowY: "scroll",
      }}
    >
      <List
        dense
      >
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="copy"
              onClick={() => {
                dispatch(duplicateElementObject());
              }}
            >
              <IconCopy size={14} />
            </IconButton>
          }
        >
          <ListItemText primary="Elements" />
        </ListItem>
      </List>
      <Divider />
      <Stack direction={"column"}>
        {sortedByLayer.map((i: any, index) => {
          return (
            <CustomButton
              key={index}
              type={
                activeElement === i.name
                  ? "primary"
                  : selectedElement.has(i.name)
                  ? "warning"
                  : "default"
              }
              value={i.name}
              onClick={() => {
                dispatch(setActiveElement(i.name));
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
}

export default LayerControl;

function CustomButton(props: {
  onClick?: any;
  type?: "default" | "primary" | "warning";
  value?: any;
}) {
  return (
    <Box
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      component={motion.div}
      display={"flex"}
      alignItems={"center"}
      px={2}
      fontSize={14}
      color={grey[200]}
      bgcolor={
        props.type === "default"
          ? grey[900]
          : props.type === "primary"
          ? blue[600]
          : purple[600]
      }
      height={40}
      sx={{
        transition: "0.3s",
        "&:hover": {
          bgcolor:
            props.type === "default"
              ? grey[800]
              : props.type === "primary"
              ? blue[800]
              : purple[800],
        },
        "&:active": {
          bgcolor:
            props.type === "default"
              ? grey[700]
              : props.type === "primary"
              ? blue[700]
              : purple[700],
        },
      }}
      onClick={props.onClick}
    >
      {props.value}
    </Box>
  );
}
