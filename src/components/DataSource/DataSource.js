import { DefaultDataBanksTerms } from "./DeafultData";

export const getDataBanksTerms = (props) => {
  let localDataSet = JSON.parse(localStorage.getItem("localDataSet"));

  if (!localDataSet) {
    localDataSet = DefaultDataBanksTerms({ emptyRows: props.emptyRows });
    if (!props.emptyRows)
      localStorage.setItem("localDataSet", JSON.stringify(localDataSet));
  }
  return localDataSet;
};

export const setDataBanksTerms = (currentRowData, updatedRowData) => {
  let localDataSet = JSON.parse(localStorage.getItem("localDataSet"));

  if (!localDataSet) {
    return;
  }

  localDataSet.rows.splice(
    localDataSet.rows.findIndex((row) => row.id === currentRowData.id),
    1,
    updatedRowData
  );

  localStorage.setItem("localDataSet", JSON.stringify(localDataSet));
};

export const addDataBanksTerms = (addRowData) => {
  let localDataSet = JSON.parse(localStorage.getItem("localDataSet"));

  if (!localDataSet) {
    localDataSet = DefaultDataBanksTerms({ emptyRows: true });
    localStorage.setItem("localDataSet", JSON.stringify(localDataSet));
  }

  localDataSet.rows.unshift(addRowData);

  localStorage.setItem("localDataSet", JSON.stringify(localDataSet));
};

export const deleteDataBanksTerms = (deleteRowId) => {
  let localDataSet = JSON.parse(localStorage.getItem("localDataSet"));

  if (!localDataSet) {
    return;
  }

  deleteRowId.forEach((id) => {
    localDataSet.rows.splice(
      localDataSet.rows.findIndex((row) => row.id === id),
      1
    );
  });

  localStorage.setItem("localDataSet", JSON.stringify(localDataSet));
};

export const selectDataBanksTerm = (selectRowId) => {
  let localDataSet = JSON.parse(localStorage.getItem("localDataSet"));

  if (!localDataSet) {
    return;
  }

  const selectedRows = selectRowId
    .map((id) => {
      return localDataSet.rows.find((item) => item.id === id);
    })
    .map((selectedItem) => {
      return {
        ...selectedItem,
        label:
          selectedItem.bankName + " i.r. " + selectedItem.interestRate + "% ",
      };
    });

  return selectedRows;
};
