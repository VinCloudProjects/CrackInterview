import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export default function ReusableSelectChip({
  label,
  items,
  selectedItems = [],
  interviewContext,
  setInterviewContext,
  name,
}) {
  const [personName, setPersonName] = useState(selectedItems);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const keys = Object.keys(interviewContext);
    if (keys.includes(name)) {
      setPersonName(Array.isArray(value) ? value : [value]);
      setInterviewContext({
        ...interviewContext,
        [name]: Array.isArray(value) ? value : [value],
      });
    }
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel sx={{ fontSize: "1.3rem" }}>{label}</InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput sx={{ fontSize: "1.3rem" }} label={label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox size="small" checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
