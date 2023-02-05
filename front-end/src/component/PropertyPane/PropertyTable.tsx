import { IconSquareMinus } from "@tabler/icons-react";
import { color } from "../../logic/theme/color";
import { border, setPx } from "../../logic/theme/property";
import Description from "../io-component/Description";
import { FieldWarper } from "../io-component/InputField";

interface FlexTableInterface {
  data: any;
  defaultValue: string;
  idW?: number;
  vW?: number;
  dW?: number;
  onDelete?: any;
  hideId?: boolean;
  style?: any;
}

export default function PropertyTable(options: FlexTableInterface) {
  const toRender = Object.keys(options.data);

  const tableCss: React.CSSProperties = {
    border: border(color.primaryHalf),
    height: "35px",
    borderRadius: "7px",
    display: "grid",
    placeItems: "center",
    fontSize: "14px",
    overflow: "hidden",
    padding: "5px 7px",
    marginBottom: "5px",
    textAlign: "center",
  };

  return (
    <>
      {toRender.length === 0 ? (
        <FieldWarper px={5} py={6} style={{ width: "100%" }}>
          <Description value={options.defaultValue} border />
        </FieldWarper>
      ) : (
        <FieldWarper px={5} py={7} direction="column">
          {toRender.map((i, idx) => {
            const idTitle = i;
            const valueTitle = options.data[i];
            return (
              <div key={idx} style={{ display: "flex", width: "100%" }}>
                {options.hideId ? null : (
                  <div
                    style={{
                      ...tableCss,
                      width: setPx(options.idW as number),
                      marginRight: "5px",
                    }}
                    title={idTitle}
                  >
                    {idTitle}
                  </div>
                )}

                <div
                  style={{
                    ...tableCss,
                    width: setPx(options.vW as number),
                    marginRight: "5px",
                  }}
                  title={valueTitle}
                >
                  ...
                </div>
                <div
                  style={{ ...tableCss, width: setPx(options.dW as number) }}
                  title={valueTitle}
                  onClick={() => {
                    options.onDelete(idTitle);
                  }}
                >
                  <IconSquareMinus size={14} />
                </div>
              </div>
            );
          })}
        </FieldWarper>
      )}
    </>
  );
}
