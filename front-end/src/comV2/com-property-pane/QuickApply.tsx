import {
  Alert,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../logic/redux-store/hooks";
import ShowIf from "../helper/ShowIf";
import {
  IconArrowAutofitContent,
  IconArrowAutofitDown,
  IconArrowAutofitRight,
  IconBorderRadius,
  IconBorderStyle,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignRight,
  IconPill,
  IconShadow,
} from "@tabler/icons-react";
import { radius } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";
import { _obj_key } from "../../logic/proto_pen_method/proto_obj_extract";
import { updateCssProps } from "../../logic/redux-store/feature/ElementObjectSlice";

function QuickApply() {
  const dispatch = useAppDispatch();
  const { elementObjectData, activeElement, activeNode } = useAppSelector(
    (s) => s.object
  );
  type QuickActionList = {
    [x: string]: { icon: any; style: React.CSSProperties };
  };
  const QuickActionList1: QuickActionList = {
    alignLeft: {
      icon: IconLayoutAlignLeft,
      style: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
    alignCenter: {
      icon: IconLayoutAlignCenter,
      style: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    alignRight: {
      icon: IconLayoutAlignRight,
      style: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      },
    },
    directionColumn: {
      icon: IconArrowAutofitDown,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
    directionRow: {
      icon: IconArrowAutofitRight,
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
    },
    maxWidthHight: {
      icon: IconArrowAutofitContent,
      style: {
        width: "max-content",
        height: "max-content",
      },
    },
    borderRounded: {
      icon: IconBorderRadius,
      style: { borderRadius: radius(7, 7, 7, 7) },
    },
    borderFlat: {
      icon: IconBorderStyle,
      style: { borderRadius: radius(0, 0, 0, 0) },
    },
    borderPill: {
      icon: IconPill,
      style: { borderRadius: radius(9999, 9999, 9999, 9999) },
    },
    shadow: {
      icon: IconShadow,
      style: {
        boxShadow: "0 2px 3px 1px " + color.shadow,
      },
    },
  };

  function genQuickActionList(QuickActionList: QuickActionList) {
    return _obj_key(QuickActionList).map((listName, index) => {
      const styles = QuickActionList[listName].style;
      const Icon = QuickActionList[listName].icon;
      return (
        <IconButton
          key={index}
          onClick={() => {
            const css = {
              ...elementObjectData[activeNode].css,
              ...styles,
            };
            dispatch(
              updateCssProps({
                activeEl: activeNode,
                css,
              })
            );
          }}
        >
          <Icon size={16} />
        </IconButton>
      );
    });
  }

  return (
    <React.Fragment>
      <List dense>
        <ListItem>
          <ListItemText primary="Quick Action" />
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
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            columnGap={0.5}
            justifyContent={"center"}
            px={1}
            py={1}
          >
            {genQuickActionList(QuickActionList1)}
          </Stack>
        }
      />
    </React.Fragment>
  );
}

export default QuickApply;
