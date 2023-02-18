import { IconPin } from "@tabler/icons-react";
import { isExist, setPx } from "../../logic/theme/property";
import { useAppSelector } from "../../logic/redux-store/hooks";
import { grey } from "@mui/material/colors";
import React from "react";

export default function PinElement() {
  const pinRedux = useAppSelector(s=>s.ui.pin);
  const [x, setX] = React.useState(20);
  const [y, setY] = React.useState(20);

  React.useEffect(()=>{
    setX(pinRedux.x)
    setY(pinRedux.y)
  },[pinRedux])

  return (
    <div
      style={{
        width: setPx(20),
        height: setPx(20),
        position: "absolute",
        left: isExist(setPx(x), setPx(20)),
        top: isExist(setPx(y), setPx(20)),
      }}
    >
      <IconPin fontSize={20} color={grey[900]}/>
    </div>
  );
}
