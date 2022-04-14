import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "../UI/Input";
import { styled } from "@mui/material/styles";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const CalculationResult = (props) => {
  console.log(props.calculationsResult);
  return (
    <Div>
      <Dialog
        id="close"
        open={props.open}
        onClose={props.handleCloseDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Monthly Payment
        </DialogTitle>
        <DialogContent>
          <Input
            input={{
              value: props.calculationsResult,
              disabled: true,
              helperText: "Monthly Payment, £",
              error: props.dataIsInvalid,
              fullWidth: true,
              type: "text",
              id: "monthlyPayment",
              variant: "standard",
              InputLabelProps: { shrink: true },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus id="cancel" onClick={props.handleCloseDialog}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Div>
  );
};

export default CalculationResult;
