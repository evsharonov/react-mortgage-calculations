import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "../UI/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CalculationsResult from "./CalculationsResult";
import CalculationsToolbar from "../AppBars/CalculationsToolBar";

const Calculations = (props) => {
  const [currentBankTerms, setCurrentBankTerms] = useState({ id: "" });

  const [dataIsInvalid, setDataIsInvalid] = useState(false);
  const refCurrentBank = useRef();
  const refInterestRate = useRef();
  const refInitialLoan = useRef();
  const refMinimumDownPayment = useRef();
  const refLoanTerm = useRef();
  const [open, setOpen] = useState(false);
  const [calculationsResult, setCalculationsResult] = useState();

  const calculateMonthlyPayment = (
    amountBorrowed,
    annualInterestRate,
    numberOfPayments
  ) => {
    const monthlyPayment =
      ((amountBorrowed * (annualInterestRate / 100 / 12) *
        Math.pow((1 + (annualInterestRate / 100 / 12)), numberOfPayments)) /
        (Math.pow((1 + (annualInterestRate / 100 / 12)), numberOfPayments) -
      1));
    console.log(
      amountBorrowed,
      annualInterestRate,
      numberOfPayments,
      monthlyPayment
    );
    return monthlyPayment;
  };

  const handleChange = (event) => {
    const currentId = event.target.value;

    const currentData =
      props.data[props.data.findIndex((row) => row.id === currentId)];

    if (currentData) {
      refInterestRate.current.value = currentData.interestRate;
      refInitialLoan.current.value = currentData.maximumLoan;
      refMinimumDownPayment.current.value = currentData.minimumDownPayment;
      refLoanTerm.current.value = currentData.loanTerm;

      setCurrentBankTerms(currentData);
    }
  };

  const handleOpenDialog = () => {
    console.log(currentBankTerms);
    if (
      currentBankTerms.id === "" ||
      currentBankTerms.interestRate < refInterestRate.current.value ||
      currentBankTerms.maximumLoan < refInitialLoan.current.value ||
      currentBankTerms.minimumDownPayment > refMinimumDownPayment.current.value
    ) {
      setDataIsInvalid(true);
      return;
    }
    setCalculationsResult(
      calculateMonthlyPayment(
        refInitialLoan.current.value,
        refInterestRate.current.value,
        refMinimumDownPayment.current.value
      )
    );
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100hw",
          height: "85vh",
        },
      }}
    >
      <Paper variant="outlined">
        <CalculationsResult
          calculationsResult={calculationsResult}
          handleCloseDialog={handleCloseDialog}
          open={open}
          setOpen={setOpen}
        />
        <CalculationsToolbar handleOpenDialog={handleOpenDialog} />
        <FormControl sx={{ m: 1, minWidth: "75ch" }}>
          <InputLabel id="labelBank">Bank</InputLabel>
          <Select
            ref={refCurrentBank}
            labelId="labelBank"
            id="selectBank"
            value={currentBankTerms.id}
            label="Bank Terms"
            onChange={handleChange}
          >
            {props.data.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Input
            ref={refInitialLoan}
            input={{
              error: dataIsInvalid,
              required: true,
              type: "number",
              step: "0.01",
              min: "0.01",
              id: "initialLoan",
              label: "Initial Loan, £",
              variant: "outlined",
              sx: { m: 1, width: "25ch" },
              InputLabelProps: { shrink: true },
            }}
          />
        </FormControl>
        <FormControl>
          <Input
            ref={refMinimumDownPayment}
            input={{
              error: dataIsInvalid,
              required: true,
              type: "number",
              step: "0.01",
              min: "0.01",
              id: "DownPayment",
              label: "Down Payment, %",
              variant: "outlined",
              sx: { m: 1, width: "25ch" },
              InputLabelProps: { shrink: true },
            }}
          />
        </FormControl>
        <FormControl>
          <Input
            ref={refInterestRate}
            input={{
              disabled: true,
              id: "interestRate",
              label: "Interest Rate, %",
              variant: "outlined",
              sx: { m: 1, width: "25ch" },
              InputLabelProps: { shrink: true },
            }}
          />
        </FormControl>
        <FormControl>
          <Input
            ref={refLoanTerm}
            input={{
              disabled: true,
              id: "loanTerm",
              label: "Loan Term, month",
              variant: "outlined",
              sx: { m: 1, width: "25ch" },
              InputLabelProps: { shrink: true },
            }}
          />
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Calculations;
