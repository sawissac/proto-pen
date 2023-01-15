import { ReactNode, forwardRef } from "react";

interface TestBoxArgs {
  children?: ReactNode;
}

export const TestBox = forwardRef((options: TestBoxArgs, ref: any) => {
  const style = {
    container: {
      width: "100px",
      height: "100px",
      backgroundColor: "black",
      borderRadius: "9px",
    },
  };
  return (
    <div ref={ref} style={style.container}>
      {options.children}
    </div>
  );
});
