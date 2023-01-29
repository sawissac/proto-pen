import React, { useCallback, useEffect, useState } from "react";
import { LayerPane } from "../LayerPane";
import CustomStyle from "../../custom.module.css";
import { Button } from "./Button";
import { debounce } from "lodash";
import { border, isExist, setPad } from "../../logic/theme/property";
import { color } from "../../logic/theme/color";

interface InputFieldArgs {
  title?: string;
  label?: string;
  placeHolder?: string;
  type?: any;
  value?: any;
  onChange?: any;
  style?: React.CSSProperties;
  readonly?: boolean;
  labelWidth?: number;
  iMrL?: number;
}

export function InputField(options: InputFieldArgs) {
  const style: React.CSSProperties = {
    border: border(color.primaryHalf),
    backgroundColor: color.primary,
    outline: "none",
    borderRadius: "5px",
    width: "60px",
    color: "white",
    padding: "7px",
    ...options.style,
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: options.iMrL + "px",
      }}
    >
      <label
        htmlFor={options.title}
        style={{
          fontSize: "13.32px",
          fontWeight: "bold",
          width: options.labelWidth + "px",
          textAlign: "center",
          marginRight: "7px",
        }}
      >
        {options.label}
      </label>
      <input
        style={style}
        type={options.type}
        title={options.title}
        id={options.title}
        onChange={options.onChange}
        value={options.value}
        placeholder={options.placeHolder}
        readOnly={options.readonly ? true : false}
      />
    </div>
  );
}

interface FieldWarper {
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  direction?: "row" | "column";
  style?: React.CSSProperties;
  children?: React.ReactNode;
  px?: number;
  py?: number;
}

export function FieldWarper(options: FieldWarper) {
  const style: React.CSSProperties = {
    padding: setPad(options.px as number, options.py as number),
    alignItems: isExist(options.align, "center"),
    flexDirection: isExist(options.direction, "row"),
    justifyContent: isExist(options.justify, "center"),
    color: color.white,
    display: "flex",
    boxSizing: "border-box",
    ...options.style,
  };
  return <div style={style}>{options.children}</div>;
}

interface SelectBoxArgs {
  dataSet?: string[];
  onChange?: any;
  searchBox?: boolean;
  sBW?: number;
  sLaW?: number;
  seLaW?: number;
}

export function SelectBox(options: SelectBoxArgs) {
  const [show, setShow] = useState(false);
  const [selectTitle, setSelectTitle] = useState("");
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState(options.dataSet);

  useEffect(() => {
    if (!options.searchBox) setFilteredData(options.dataSet);
  }, []);

  const handleSearch = useCallback(
    debounce((value) => {
      const list: any = options.dataSet?.filter((i) => i.includes(value));
      setFilteredData(list);
    }, 500),
    []
  );

  return (
    <>
      <FieldWarper px={16} py={1} justify="flex-start">
        <Button.Label
          label="Type"
          laW={options.sLaW}
          h={35}
          w={options.sBW}
          r={7}
          primary={true}
          listener={() => {
            setShow((i) => !i);
          }}
        >
          {selectTitle ? selectTitle : "Select Type"}
        </Button.Label>
      </FieldWarper>

      {options.searchBox && show ? (
        <FieldWarper direction="column" align="flex-start" px={5} py={5}>
          <InputField
            label={"search"}
            iMrL={0}
            value={input}
            style={{ width: options.sBW + "px", textAlign: "center" }}
            labelWidth={options.seLaW}
            onChange={(ev: any) => {
              setInput(ev.target.value);
              handleSearch(ev.target.value);
            }}
          />
        </FieldWarper>
      ) : null}

      {show ? (
        <FieldWarper
          align="flex-end"
          direction="column"
          px={16}
          py={5}
          style={{
            width: "100%",
          }}
        >
          <LayerPane
            flowY={true}
            direction="column"
            justify="flex-start"
            w={options.sBW}
            h={100}
            r={7}
            className={CustomStyle.protoPenScrollbarPrimary}
          >
            {filteredData?.map((i, index) => (
              <Button.Click
                key={index}
                w={165}
                h={34}
                primary
                style={{}}
                listener={() => {
                  options.onChange(i);
                  setSelectTitle(i);
                  setShow(false);
                }}
              >
                {i}
              </Button.Click>
            ))}
          </LayerPane>
        </FieldWarper>
      ) : null}
    </>
  );
}
