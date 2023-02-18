import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function CustomInput(props: { onClick: any; value: string; }) {
  return (
    <Box
      component="div"
      display={"flex"}
      flexDirection={"row"}
      py={1}
      px={2}
      sx={{
        fontSize: 14,
        color: grey[200],
        bgcolor: grey[900],
        transitionDuration: "0.3s",
        "&:hover": {
          bgcolor: grey[800],
        },
        "&:active": {
          bgcolor: grey[900],
        },
      }}
      onClick={() => {
        props.onClick(props.value);
      }}
    >
      {props.value}
    </Box>
  );
}

export default CustomInput;
