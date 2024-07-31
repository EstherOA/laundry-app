import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Grid
      templateAreas={`"header header"
    "sidenav main"`}
      gridTemplateRows={"76px 1fr"}
      gridTemplateColumns={"300px 1fr"}
      h="100%"
    >
      <GridItem area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem area={"sidenav"}>
        <Sidebar />
      </GridItem>
      <GridItem area={"main"}>
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Layout;
