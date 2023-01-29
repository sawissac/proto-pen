import React from "react";
import { useAppDispatch } from "../../logic/redux-store/hooks";
import { ProtoPenElement } from "../../logic/proto_pen_method/proto_create_element";
import { Divider, Title } from "../io-component/MessageDialogBox";
import { FieldWarper, InputField, SelectBox } from "../io-component/InputField";
import { Button } from "../io-component/Button";
import { CssProperty } from "../../logic/css-properties";
import { camelCase } from "lodash";
import { color } from "../../logic/theme/color";
import { border, setPx } from "../../logic/theme/property";
import Description from "../io-component/Description";
import {
  sharedCss,
  updateCssProps,
} from "../../logic/redux-store/feature/ElementObjectSlice";

export function NodeModel({ data }: { data: ProtoPenElement }) {
  const dispatch = useAppDispatch();
  const [input, setInput] = React.useState({
    select: "",
    value: "",
    css: {},
    sharedCssChild: {},
    child: "",
  });

  React.useEffect(() => {
    dispatch(
      updateCssProps({
        css: input.css,
      })
    );
  }, [input.css]);
  React.useEffect(() => {
    dispatch(
      sharedCss({
        cssSharedChild: input.sharedCssChild,
      })
    );
  }, [input.sharedCssChild]);

  return (
    <div style={{ paddingBottom: "7px" }}>
      <Title value="Node Model" />
      <Divider />
      <Title value="Shared Child" />
      <Divider />
      <FieldWarper px={16} py={5}>
        <InputField
          label={"Search"}
          iMrL={0}
          value={input.child}
          style={{ width: "100%", textAlign: "center" }}
          labelWidth={152}
          onChange={(ev: any) => {
            setInput((i) => ({ ...i, child: ev.target.value }));
          }}
        />
      </FieldWarper>
      <FlexTable
        idW={95}
        vW={137}
        data={data.cssSharedChild}
        defaultValue="No Child is shared!"
      />
      <FieldWarper px={16} py={5}>
        <Button.Click
          r={7}
          h={35}
          style={{ flex: 1 }}
          listener={() => {
            setInput((i) => ({
              ...i,
              sharedCssChild: {
                ...i.sharedCssChild,
                [input.child]: "shared",
              },
            }));
          }}
        >
          Set
        </Button.Click>
      </FieldWarper>
      <Divider />
      <FieldWarper px={16} py={5}>
        <InputField
          label="Name"
          value={data.text}
          readonly={true}
          labelWidth={150}
          style={{ width: "100%", textAlign: "center" }}
        />
      </FieldWarper>
      <SelectBox
        dataSet={Object.keys(CssProperty)}
        sLaW={93}
        sBW={136}
        seLaW={97}
        searchBox={true}
        onChange={(v: any) => {
          setInput((i) => ({ ...i, select: v }));
        }}
      />
      <FieldWarper direction="column" px={16} py={5}>
        <InputField
          label="Value"
          labelWidth={150}
          style={{ width: "100%", textAlign: "center", marginTop: "7px" }}
          value={input.value}
          onChange={(ev: any) => {
            setInput((i) => ({ ...i, value: ev.target.value }));
          }}
        />
      </FieldWarper>
      {input.select ? (
        <FieldWarper direction="column" px={16} py={5}>
          <Description
            h={"max-content"}
            value={CssProperty[input.select].syntax}
            border
          />
        </FieldWarper>
      ) : null}

      <FieldWarper px={16} py={5}>
        <Button.Click
          r={7}
          h={35}
          style={{ width: "100%" }}
          listener={() => {
            setInput((i) => {
              return {
                ...i,
                css: {
                  ...i.css,
                  [camelCase(input.select)]: input.value,
                },
              };
            });
          }}
        >
          Set
        </Button.Click>
      </FieldWarper>
      <Divider />
      <Title value="CSS Props" />
      <FlexTable
        idW={95}
        vW={137}
        data={data.css}
        defaultValue="No value is set!"
      />
    </div>
  );
}

interface FlexTableInterface {
  data: any;
  defaultValue: string;
  idW: number;
  vW: number;
}

function FlexTable(options: FlexTableInterface) {
  const toRender = Object.keys(options.data);

  const tableCss: React.CSSProperties = {
    border: border(color.primaryHalf),
    height: "35px",
    borderRadius: "7px",
    display: "grid",
    placeItems: "center",
    fontSize: "14px",
  };

  return (
    <>
      {toRender.length === 0 ? (
        <FieldWarper px={16} py={1}>
          <Description value={options.defaultValue} border />
        </FieldWarper>
      ) : (
        <FieldWarper
          style={{ border: border(color.primaryHalf) }}
          direction="column"
        >
          {toRender.map((i, idx) => {
            return (
              <div key={idx} style={{ display: "flex", width: "100%" }}>
                <div
                  style={{
                    ...tableCss,
                    width: setPx(options.idW),
                    marginRight: "5px",
                  }}
                >
                  {i}
                </div>
                <div style={{ ...tableCss, width: setPx(options.vW) }}>
                  {options.data[i]}
                </div>
              </div>
            );
          })}
        </FieldWarper>
      )}
    </>
  );
}
