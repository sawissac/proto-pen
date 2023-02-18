import React from "react";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import { grey } from "@mui/material/colors";

const AppFrame = React.forwardRef((props: any, ref: any) => {
  return (
    <Stack
      ref={ref}
      className="App"
      component={motion.div}
      direction="row"
      justifyContent="flex-start"
    >
      {props.children}
    </Stack>
  );
});

export default AppFrame;
