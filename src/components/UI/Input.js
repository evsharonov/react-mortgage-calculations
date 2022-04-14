import React from "react";
import TextField from "@mui/material/TextField";

const Input = React.forwardRef((props, ref) => {
  return <TextField inputRef={ref} {...props.input} />;
});

export default Input; 
