import React from "react";
import { IconPin } from "@tabler/icons-react";
import { isExist, setPx } from "../../logic/theme/property";

interface PinArgs {
  x: number;
  y: number;
}

export const Pin = React.forwardRef((options: PinArgs, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        width: setPx(20),
        height: setPx(20),
        position: "absolute",
        left: isExist(setPx(options.x), setPx(20)),
        top: isExist(setPx(options.y), setPx(20)),
      }}
    >
      <IconPin fontSize={20} />
    </div>
  );
});
