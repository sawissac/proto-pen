import { Stack } from "@mui/system";
import { useAppSelector } from "../../logic/redux-store/hooks";
import { Box, Chip, Paper } from "@mui/material";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconQuestionMark,
} from "@tabler/icons-react";
import { grey } from "@mui/material/colors";

function Message() {
  const UiRedux = useAppSelector((s) => s.ui);
  const { type, message } = UiRedux.messageDialog;

  return (
    <Paper
      sx={{
        width: UiRedux.canvasWidth,
        height: 34,
        position: "fixed",
        bottom: 0,
        left: UiRedux.controlPaneWidth,
        fontSize: 14,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 0.5,
      }}
    >
      <Chip
        label={message}
        color={type as any}
        size="small"
        sx={{ userSelect: "none" }}
        icon={
          type === "success" ? (
            <IconCircleCheck size={14} />
          ) : type === "warning" ? (
            <IconAlertTriangle size={14} />
          ) : (
            <IconQuestionMark size={14} />
          )
        }
      />
    </Paper>
  );
}

export default Message;
