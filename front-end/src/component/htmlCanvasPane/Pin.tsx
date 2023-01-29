import React from 'react'
import { IconPin } from '@tabler/icons-react';

interface PinArgs {
  x: number;
  y: number;
}

export const Pin = React.forwardRef((options: PinArgs, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        width: "20px",
        height: "20px",
        position: "absolute",
        left: options.x + "px",
        top: options.y + "px",
      }}
    >
      <IconPin fontSize={20} />
    </div>
  );
});