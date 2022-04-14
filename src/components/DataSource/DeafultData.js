import { v4 as uuidv4 } from "uuid";

export const DefaultDataBanksTerms = (props) => {
  const dataColumns = [
    { field: "id", headerName: "ID", width: 5 },
    {
      field: "bankName",
      headerName: "Bank",
      width: 325,
      editable: true,
    },
    {
      field: "interestRate",
      headerName: "Interest Rate, %",
      type: "number",
      step: "0.01",
      flex: 1,
      minwidth: 75,
      maxwidth: 110,
      editable: true,
    },
    {
      field: "maximumLoan",
      headerName: "Maximum Loan, £",
      type: "number",
      step: "0.01",
      flex: 1,
      minwidth: 90,
      maxwidth: 110,
      editable: true,
    },
    {
      field: "minimumDownPayment",
      headerName: "Minimum Down Payment, %",
      type: "number",
      step: "0.01",
      flex: 1,
      minwidth: 110,
      editable: true,
    },
    {
      field: "loanTerm",
      headerName: "Loan Term, months",
      type: "number",
      flex: 1,
      minwidth: 110,
      editable: true,
    },
  ];

  let dataRows = [{
    id: uuidv4(),
    bankName: "",
    interestRate: 0,
    maximumLoan: 0,
    minimumDownPayment: 0,
    loanTerm: 0,
  }];

  if (!props.emptyRows) {
    dataRows = [
      {
        id: 1,
        bankName: "Abbey National Treasury Services plc",
        interestRate: 2.73,
        maximumLoan: 350000,
        minimumDownPayment: 10.5,
        loanTerm: 12,
      },
      {
        id: 2,
        bankName: "ABC International Bank plc",
        interestRate: 3.52,
        maximumLoan: 50000,
        minimumDownPayment: 18.0,
        loanTerm: 24,
      },
      {
        id: 3,
        bankName: "The Access Bank UK Limited",
        interestRate: 4.5,
        maximumLoan: 45000,
        minimumDownPayment: 3.0,
        loanTerm: 36,
      },
      {
        id: 4,
        bankName: "ADIB (UK) Ltd",
        interestRate: 3.51,
        maximumLoan: 160000,
        minimumDownPayment: 15,
        loanTerm: 12,
      },
      {
        id: 5,
        bankName: "Ahli United Bank (UK) plc",
        interestRate: 3.8,
        maximumLoan: null,
        minimumDownPayment: 12,
        loanTerm: 24,
      },
      {
        id: 6,
        bankName: "AIB Group (UK) plc",
        interestRate: null,
        maximumLoan: 150000,
        minimumDownPayment: 14.5,
        loanTerm: 36,
      },
      {
        id: 7,
        bankName: "Bank of Ireland (UK) Plc",
        interestRate: 4.61,
        maximumLoan: 44000,
        minimumDownPayment: 10,
        loanTerm: 12,
      },
      {
        id: 8,
        bankName: "Bank of London, The",
        interestRate: 3.87,
        maximumLoan: 36000,
        minimumDownPayment: 9.5,
        loanTerm: 24,
      },
      {
        id: 9,
        bankName: "Bank of Scotland plc",
        interestRate: 2.98,
        maximumLoan: 65000,
        minimumDownPayment: 7.8,
        loanTerm: 36,
      },
      {
        id: 10,
        bankName: "C. Hoare & Co",
        interestRate: 3.91,
        maximumLoan: 350000,
        minimumDownPayment: 12,
        loanTerm: 12,
      },
      {
        id: 12,
        bankName: "CAF Bank Ltd",
        interestRate: 4.1,
        maximumLoan: 42000,
        minimumDownPayment: 13.5,
        loanTerm: 24,
      },
      {
        id: 13,
        bankName: "Cashplus Bank",
        interestRate: 4.21,
        maximumLoan: 450000,
        minimumDownPayment: 9.9,
        loanTerm: 12,
      },
      {
        id: 14,
        bankName: "GE Capital Bank Limited",
        interestRate: 3.65,
        maximumLoan: 160000,
        minimumDownPayment: 8.9,
        loanTerm: 24,
      },
      {
        id: 15,
        bankName: "Goldman Sachs International Bank",
        interestRate: 3.57,
        maximumLoan: null,
        minimumDownPayment: 7.0,
        loanTerm: 36,
      },
      {
        id: 16,
        bankName: "Guaranty Trust Bank (UK) Limited",
        interestRate: null,
        maximumLoan: 150000,
        minimumDownPayment: 10,
        loanTerm: 12,
      },
      {
        id: 17,
        bankName: "ICBC (London) plc",
        interestRate: 4.5,
        maximumLoan: 44000,
        minimumDownPayment: 12.2,
        loanTerm: 24,
      },
      {
        id: 18,
        bankName: "ICBC Standard Bank Plc",
        interestRate: 2.87,
        maximumLoan: 36000,
        minimumDownPayment: 7.5,
        loanTerm: 36,
      },
      {
        id: 19,
        bankName: "Melli Bank plc",
        interestRate: 4.0,
        maximumLoan: 60000,
        minimumDownPayment: 1.5,
        loanTerm: 12,
      },
      {
        id: 21,
        bankName: "Monzo Bank Ltd",
        interestRate: 3.21,
        maximumLoan: 35000,
        minimumDownPayment: 0,
        loanTerm: 36,
      },
    ];
  }

  return { columns: dataColumns, rows: dataRows };
};