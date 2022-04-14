import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  getDataBanksTerms,
  setDataBanksTerms,
  addDataBanksTerms,
  deleteDataBanksTerms,
} from "../DataSource/DataSource";
import EditToolbar from "../AppBars/EditToolBar";
import AddNewBankTerms from "./AddNewBankTerms";

const loadServerRows = (page) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getDataBanksTerms({ emptyRows: false });
      resolve(data.rows.slice(page * 9, (page + 1) * 9));
    }, Math.random() * 500); // simulate network latency
  });
};

const selectionModelReducer = (state, action) => {
  //console.log("_", action.type, action.pageChanged, state, action.mode);
  if (action.type === "setTimout") {
    return action.mode;
  } else if (action.type === "onSelectionModelChange") {
    if (action.pageChanged) {
      return state;
    }
    return action.mode;
  } else if (action.type === "onPageChange") {
    if (action.pageChanged) {
      return state;
    }
    return action.mode;
  }
  return state;
};

const BanksGrid = (props) => {
  const initialData = getDataBanksTerms({ emptyRows: true });

  const [page, setPage] = useState(0);
  const [pageChanged, setPageChanged] = useState(false);
  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedCellParams, setSelectedCellParams] = useState(null);
  const [open, setOpen] = useState(false);

  const [selectionModel, setSelectionModel] = useReducer(
    selectionModelReducer,
    []
  );

  const prevSelectionModel = useRef(selectionModel);

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page);
      if (!active) {
        return;
      }
      setLoading(false);
      setRows(newRows);
      setTimeout(() => {
        setSelectionModel({
          type: "setTimout",
          pageChanged: pageChanged,
          mode: prevSelectionModel.current,
        });
      });
    })();
    setPageChanged(false);
    return () => {
      active = false;
    };
  }, [page, pageChanged]);

  const handleCellClick = useCallback((params) => {
    setSelectedCellParams(params);
  }, []);

  const handleCellEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleCellEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleOpenDialog = (event) => {
    setSelectedCellParams(null);
    setPageChanged(true);
    setOpen(true);
  };

  const handleAddDataBankTerms = (addRowData) => {
    addDataBanksTerms(addRowData);
    setPageChanged(true);
  };

  const handleDeleteRow = () => {
    deleteDataBanksTerms(selectionModel);
    setPageChanged(true);
  };

  const setSwitchPageDataSet = (currentSelectionModel) => {
    // console.log("!setSwitchPageDataSet", currentSelectionModel);
    props.switchHandler(currentSelectionModel);
  };

  return (
    <div style={{ height: "88vh", width: "100hw" }}>
      <AddNewBankTerms
        open={open}
        handleAddDataBankTerms={handleAddDataBankTerms}
        setOpen={setOpen}
      />
      <DataGrid
        rows={rows}
        columns={initialData.columns}
        pagination
        checkboxSelection
        disableSelectionOnClick
        rowCount={initialData.rows.length}
        pageSize={9}
        rowsPerPageOptions={[9]}
        paginationMode="server"
        onCellClick={handleCellClick}
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        onPageChange={(newPage) => {
          setPageChanged(true);
          setSelectionModel({
            type: "onPageChange",
            mode: prevSelectionModel.current,
            pageChanged: pageChanged,
          });
          prevSelectionModel.current = selectionModel;
          setPage(newPage);
          setSelectedCellParams(null);
          // console.log("*onPageChange", pageChanged, selectionModel, );
          setSwitchPageDataSet(selectionModel);
        }}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel({
            type: "onSelectionModelChange",
            mode: newSelectionModel,
            pageChanged: pageChanged,
          });
          setPageChanged(false);
          // console.log("*onSelectionModelChange", pageChanged, selectionModel, newSelectionModel);
          setSwitchPageDataSet(newSelectionModel);
        }}
        selectionModel={selectionModel}
        loading={loading}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            selectedCellParams,
            setSelectedCellParams,
            handleOpenDialog,
            handleDeleteRow,
            setDataBanksTerms,
          },
        }}
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BanksGrid;
