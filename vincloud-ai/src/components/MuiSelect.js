import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function MuiSelect({
  label,
  items,
  selectedItems,
  interviewContext,
  setInterviewContext,
  name,
  required,
  errorText,
}) {
  const [selected, setSelected] = useState(selectedItems);

  const handleChange = (event) => {
    const keys = Object.keys(interviewContext);
    if (keys.includes(name)) {
      setInterviewContext({ ...interviewContext, [name]: event.target.value });
      setSelected(event.target.value);
    }
  };

  return (
    <FormControl sx={{ m: 1 }} fullWidth required={required}>
      <InputLabel sx={{ fontSize: "1.3rem" }}>{label}</InputLabel>
      <Select
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput sx={{ fontSize: "1.3rem" }} label={label} />}
        MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem sx={{ fontSize: "1.3rem" }} key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {errorText && (
        <div style={{ color: "red" }}>Please enter this required field</div>
      )}
    </FormControl>
  );
}
