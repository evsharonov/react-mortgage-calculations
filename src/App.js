import { Fragment, useState } from "react";
import HeaderBar from "./components/AppBars/HeaderBar";
import BanksGrid from "./components/Banks/BanksGrid";
import Calculations from "./components/Calculations/Calculations";
import { styled } from "@mui/material/styles";
import { selectDataBanksTerm } from "./components/DataSource/DataSource";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const contentSwitch = (id, data, handler) => {
  switch (id) {
    case "BanksTerms":
      return {
        page: <BanksGrid switchHandler={handler} data={data} />,
        id: "BanksTerms",
      };
    case "Calculations":
      return {
        page: <Calculations switchHandler={handler} data={data} />,
        id: "Calculations",
      };
    default:
      return {
        page: <BanksGrid switchHandler={handler} data={data} />,
        id: "BanksTerms",
      };
  }
};

const App = () => {
  const [pageData, setPageData] = useState([]);

  const contentSwitchHandler = (newPageData) => {
    setPageData(selectDataBanksTerm(newPageData));
  };
  
  const [currentContent, setCurrentContent] = useState({
    page: <BanksGrid switchHandler={contentSwitchHandler} data={pageData} />,
    id: "BanksGrid",
  });

  const handleClickNavMenu = (event) => {
    if (event.target.id === currentContent.id) {
      event.preventDefault();
      return;
    }
    setCurrentContent(
      contentSwitch(event.target.id, pageData, contentSwitchHandler)
    );
  };

  return (
    <Fragment>
      <HeaderBar handleClickNavMenu={handleClickNavMenu} />
      <Div>{currentContent.page}</Div>
    </Fragment>
  );
};

export default App;
