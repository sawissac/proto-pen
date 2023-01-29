import { setPad, setPx } from "./property";

export const generateButtonTheme = (
  w: number,
  h: number,
  r: number,
  px: number,
  py: number
) => ({
  width: setPx(w),
  height: setPx(h),
  borderRadius: setPx(r),
  padding: setPad(px, py),
  border: 0,
  outline: "none",
  color: "white",
  fontSize: "13px",
});
