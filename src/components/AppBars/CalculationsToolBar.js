import * as React from "react";
import Stack from "@mui/material/Stack";
import CalculateIcon from "@mui/icons-material/Calculate";
import Button from "@mui/material/Button";

const CalculationsToolbar = (props) => {
  return (
    <Stack
      sx={{ width: "100hw", m: 1 }}
      direction="row"
      alignItems="flex-start"
      columnGap={1}
    >
      <Button
        size="small"
        onClick={props.handleOpenDialog}
        startIcon={<CalculateIcon />}
      >
        Calculate mortgage
      </Button>
    </Stack>
  );
};

export default CalculationsToolbar;
