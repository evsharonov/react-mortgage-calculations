import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "../UI/Input";
import { v4 as uuidv4 } from "uuid";

const AddNewBankTerms = (props) => {
  const [dataIsInvalid, setDataIsInvalid] = useState(false);
  const refBankName = useRef();
  const refInterestRate = useRef();
  const refMaximumLoan = useRef();
  const refMinimumDownPayment = useRef();
  const refLoanTerm = useRef();

  const handleCloseDialog = (event) => {
    if (event.target.id === "cancel" || event.target.id === "close") {
      props.setOpen(false);
      return;
    }

    const enteredBankName = refBankName.current.value;
    const enteredInterestRate = +refInterestRate.current.value;
    const enteredMaximumLoan = +refMaximumLoan.current.value;
    const enteredMinimumDownPayment = +refMinimumDownPayment.current.value;
    const enteredLoanTerm = +refLoanTerm.current.value;

    if (
      enteredBankName.trim().length === 0 ||
      enteredInterestRate <= 0 ||
      enteredMaximumLoan <= 0 ||
      enteredMinimumDownPayment <= 0 ||
      enteredLoanTerm <= 0
    ) {
      setDataIsInvalid(true);
      return;
    }

    props.handleAddDataBankTerms({
      id: uuidv4(),
      bankName: enteredBankName,
      interestRate: enteredInterestRate,
      maximumLoan: enteredMaximumLoan,
      minimumDownPayment: enteredMinimumDownPayment,
      loanTerm: enteredLoanTerm,
    });

    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        id="close"
        open={props.open}
        onClose={handleCloseDialog}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          New Terms
        </DialogTitle>
        <DialogContent>
          <Input
            ref={refBankName}
            input={{
              error: dataIsInvalid,
              required: true,
              fullWidth: true,
              type: "text",
              id: "bankName",
              label: "Bank Name",
              variant: "outlined",
            }}
          />
          <Input
            ref={refInterestRate}
            input={{
              error: dataIsInvalid,
              required: true,
              type: "number",
              step: "0.01",
              min: "0.01",
              id: "interestRate",
              label: "Interest Rate, %",
              variant: "outlined",
              sx: { m: 1, width: "30ch" },
            }}
          />
          <Input
            ref={refMaximumLoan}
            input={{
              error: dataIsInvalid,
              required: true,
              type: "number",
              step: "0.01",
              min: "0.01",
              id: "maximumLoan",
              label: "Maximum Loan, £",
              variant: "outlined",
              sx: { m: 1, width: "30ch" },
            }}
          />
          <Input
            ref={refMinimumDownPayment}
            input={{
              error: dataIsInvalid,
              required: true,
              type: "number",
              step: "0.01",
              min: "0.01",
              id: "minimumDownPayment",
              label: "Minimum Down Payment, %",
              variant: "outlined",
              sx: { m: 1, width: "30ch" },
            }}
          />
          <Input
            ref={refLoanTerm}
            input={{
              error: dataIsInvalid,
              required: true,
              type: "number",
              min: "1",
              id: "loanTerm",
              label: "Loan Term, month",
              variant: "outlined",
              sx: { m: 1, width: "30ch" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus id="cancel" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button id="submit" onClick={handleCloseDialog}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewBankTerms;
