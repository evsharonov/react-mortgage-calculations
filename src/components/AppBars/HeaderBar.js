import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const pages = ["Banks", "Calculations"];
 
const HeaderBar = (props) => {
  return (
    <AppBar position="static"> 
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography 
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: "flex" }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            {pages.map((page) => (
              <Button
                id={page}
                key={page}
                onClick={props.handleClickNavMenu}
                sx={{ my: 2, color: "white", display: "flex" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderBar;
