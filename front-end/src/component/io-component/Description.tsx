import { border, isExist } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";

interface DescriptionInterface {
  value: string;
  w?: number | string;
  h?: number | string;
  border?: boolean;
}

export default function Description(options: DescriptionInterface) {
  return (
    <div
      style={{
        border: options.border ? border(color.primaryHalf) : "none",
        width: isExist(options.w, "100%"),
        height: isExist(options.h, "50px"),
        borderRadius: "7px",
        fontSize: "14px",
        display: "grid",
        placeItems: "center",
        padding: "10px 16px"
      }}
    >
      {options.value}
    </div>
  );
}
