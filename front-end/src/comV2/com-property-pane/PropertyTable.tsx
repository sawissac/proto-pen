import {
  Alert,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import ShowIf from "../helper/ShowIf";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import { _obj_key } from "../../logic/proto_pen_method/proto_obj_extract";
import { IconTrash } from "@tabler/icons-react";
import { updateCssProps } from "../../logic/redux-store/feature/ElementObjectSlice";

function PropertyTable() {
  const { elementObjectData, activeElement, activeNode } = useAppSelector(
    (s) => s.object
  );
  const dispatch = useAppDispatch();
  const activeElements: any = activeElement
    ? elementObjectData[activeNode]
    : {};
  const activeElementCss: any = activeElements ? activeElements.css : {};
  const activeElementCssKey: any = _obj_key(activeElementCss);
  return (
    <React.Fragment>
      <List dense>
        <ListItem>
          <ListItemText primary="Applied Property" />
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
        sif={activeElementCssKey === null}
        show={<Alert severity="info">No css applied!</Alert>}
      />
      <ShowIf
        sif={activeElementCssKey && activeElement && activeNode}
        show={
          <TableContainer
            component={Paper}
            className="default-scrollbar"
            sx={{ height: 150, overflow: "scroll" }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">Property</TableCell>
                  <TableCell align="left">Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <ShowIf
                  sif={activeElementCssKey}
                  show={
                    <React.Fragment>
                      {activeElementCssKey.map((i: string, index: number) => {
                        const cssValue = activeElementCss[i];
                        const cssProperty = i;
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <IconButton
                                onClick={() => {
                                  const copy: any = {
                                    ...elementObjectData[activeNode].css,
                                  };

                                  delete copy[cssProperty];

                                  dispatch(
                                    updateCssProps({
                                      activeEl: activeNode,
                                      css: copy,
                                    })
                                  );
                                }}
                              >
                                <IconTrash size={14} />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                minWidth: "100px",
                                overflow: "hidden",
                              }}
                            >
                              {cssProperty.length > 8
                                ? cssProperty.substring(0, 8) + "..."
                                : cssProperty}
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                minWidth: "100px",
                                overflow: "hidden",
                              }}
                            >
                              {cssValue.length > 6
                                ? cssValue.substring(0, 6) + "..."
                                : cssValue}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>
        }
      />
    </React.Fragment>
  );
}

export default PropertyTable;
