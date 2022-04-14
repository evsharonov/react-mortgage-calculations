import * as React from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useGridApiContext } from "@mui/x-data-grid";

const EditToolbar = (props) => {
  const apiRef = useGridApiContext();
  const {
    selectedCellParams,
    setSelectedCellParams,
    handleOpenDialog,
    handleDeleteRow,
    setDataBanksTerms,
  } = props;

  let isEditableCell = false;

  if (selectedCellParams) {
    isEditableCell = selectedCellParams.isEditable;
  }

  const handleClick = async () => {
    if (!selectedCellParams) {
      return;
    }

    const { id, field, cellMode } = selectedCellParams;

    if (cellMode === "edit") {
      const currentRowData = apiRef.current.getRow(id);
      apiRef.current.stopCellEditMode({ id, field });
      setSelectedCellParams({ ...selectedCellParams, cellMode: "view" });
      const updatedRowData = apiRef.current.getRow(id);
      setDataBanksTerms(currentRowData, updatedRowData);
    } else {
      apiRef.current.startCellEditMode({ id, field });
      setSelectedCellParams({ ...selectedCellParams, cellMode: "edit" });
    }
  };

  const handleMouseDown = (event) => {
    // Keep the focus in the cell
    event.preventDefault();
  };

  return (
    <Stack
      sx={{ width: "100hw", m: 1 }}
      direction="row"
      alignItems="flex-start"
      columnGap={1}
    >
      <Button size="small" onClick={handleOpenDialog} startIcon={<AddIcon />}>
        Add
      </Button>
      <Button size="small" onClick={handleDeleteRow} startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        disabled={!isEditableCell}
        size="small"
        startIcon={<EditIcon />}
      >
        {selectedCellParams?.cellMode === "edit" ? "Save" : "Edit"}
      </Button>
    </Stack>
  );
};

EditToolbar.propTypes = {
  selectedCellParams: PropTypes.any,
  setSelectedCellParams: PropTypes.func.isRequired,
};

export default EditToolbar;
