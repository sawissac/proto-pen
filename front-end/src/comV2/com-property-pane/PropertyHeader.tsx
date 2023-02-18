import React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { IconCopy, IconPlus, IconTrash } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { motion } from "framer-motion";
import ShowIf from "../helper/ShowIf";
import { IconX } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import {
  createNode,
  duplicateNode,
  removeNode,
  setActiveNode,
} from "../../logic/redux-store/feature/ElementObjectSlice";
function PropertyHeader() {
  const activeNodeRedux = useAppSelector((s) => s.object.activeNode);
  const [input, setInput] = React.useState(false);
  const [name, setName] = React.useState("");
  const dispatch = useAppDispatch();

  function confirmNaming() {
    dispatch(
      createNode({
        name,
      })
    );
    setName("");
    setInput(false);
  }
  return (
    <React.Fragment>
      <List dense>
        <ListItem
          secondaryAction={
            <Stack gap={1} direction={"row"}>
              <IconButton
                edge="end"
                aria-label="copy"
                onClick={() => {
                  if (activeNodeRedux) dispatch(duplicateNode(activeNodeRedux));
                }}
              >
                <IconCopy size={14} />
              </IconButton>

              <ShowIf
                sif={!input}
                show={
                  <IconButton
                    edge="end"
                    aria-label="new"
                    onClick={() => {
                      setInput(true);
                    }}
                  >
                    <IconPlus size={14} />
                  </IconButton>
                }
              />
              <ShowIf
                sif={input && !name}
                show={
                  <IconButton
                    edge="end"
                    aria-label="close"
                    onClick={() => {
                      setInput(false);
                    }}
                  >
                    <IconX size={14} />
                  </IconButton>
                }
              />
              <ShowIf
                sif={input && name}
                show={
                  <IconButton
                    edge="end"
                    aria-label="confirm"
                    onClick={confirmNaming}
                  >
                    <IconCheck size={14} />
                  </IconButton>
                }
              />
              <IconButton
                edge="end"
                aria-label="copy"
                onClick={() => {
                  dispatch(removeNode(activeNodeRedux));
                  dispatch(setActiveNode(""));
                }}
              >
                <IconTrash size={14} />
              </IconButton>
            </Stack>
          }
        >
          <ListItemText primary="CSS" />
        </ListItem>
      </List>
      <Divider />
      <ShowIf
        sif={input}
        show={
          <Box
            px={2}
            py={1}
            component={motion.div}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <TextField
              value={name}
              label="Css Name"
              variant="standard"
              size="small"
              sx={{
                width: "100%",
                "& .MuiInputLabel-root.Mui-focused": { color: "grey.200" },
                "& .MuiInputBase-input": {
                  color: "grey.200",
                  fontSize: 14,
                },
              }}
              placeholder="Write Name..."
              onChange={(ev: any) => {
                setName(ev.target.value);
              }}
              onKeyDown={(ev: any) => {
                if (ev.key === "Enter") {
                  confirmNaming();
                }
              }}
              focused
            />
          </Box>
        }
      />
    </React.Fragment>
  );
}

export default PropertyHeader;
