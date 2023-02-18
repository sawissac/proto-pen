import { TextField } from "@mui/material";

export const CustomTextField = (props: {
  value?: string | number;
  onChange?: any;
  label?: string;
  type?: string;
  disable?: boolean;
}) => {
  return (
    <TextField
      label={props.label}
      type={props.type}
      variant="standard"
      size="small"
      value={props.value}
      onChange={props.onChange}
      disabled={props.disable}
      sx={{
        "& .MuiInputLabel-root.Mui-focused": { color: "grey.200" },
        "& .MuiInputBase-input": {
          width: 200,
          color: "grey.200",
          fontSize: 14
        },
      }}
      focused
    />
  );
};
