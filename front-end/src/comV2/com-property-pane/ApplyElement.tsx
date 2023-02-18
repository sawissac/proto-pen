import React from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import ShowIf from "../helper/ShowIf";
import {
  Alert,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import {
  disconnectCssSharedChild,
  sharedCss,
} from "../../logic/redux-store/feature/ElementObjectSlice";

function ApplyElement() {
  const { elementObjectData, activeElement, activeNode } = useAppSelector(
    (s) => s.object
  );
  const dispatch = useAppDispatch();
  return (
    <React.Fragment>
      <List dense>
        <ListItem>
          <ListItemText primary="Use Css" />
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
          <Stack py={1} px={2}>
            <ShowIf
              sif={
                activeElement &&
                Object.hasOwn(
                  elementObjectData[activeElement].className,
                  activeNode
                )
              }
              show={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(
                      disconnectCssSharedChild({
                        activeEl: activeNode,
                        deleteName: activeElement,
                      })
                    );
                  }}
                >
                  Remove
                </Button>
              }
            />
            <ShowIf
              sif={
                activeElement &&
                !Object.hasOwn(
                  elementObjectData[activeElement].className,
                  activeNode
                )
              }
              show={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const cssSharedChild = {
                      ...elementObjectData[activeNode].cssSharedChild,
                      [activeElement]: "shared",
                    };
                    dispatch(
                      sharedCss({
                        activeEl: activeNode,
                        cssSharedChild: cssSharedChild,
                      })
                    );
                  }}
                >
                  Use
                </Button>
              }
            />
          </Stack>
        }
      />
    </React.Fragment>
  );
}

export default ApplyElement;
