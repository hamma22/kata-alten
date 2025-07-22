import { Box, Container } from "@mui/material";
import TopBar from "../components/TopBar/TopBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" overflow="hidden">
      <TopBar />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: "90px",
        }}
      >
        <Container maxWidth disableGutters>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
