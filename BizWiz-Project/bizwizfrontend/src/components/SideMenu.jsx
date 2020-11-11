import React from "react";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { mainListItems } from "../features/HomePage/sidebar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function SideMenu() {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 200,
      position: "fixed",
      maxWidth: 220,
    },
    mainList: {
      margin: 20,
      maxWidth: 220,
    },
    drawerPaper: {
      backgroundColor: "#e3f2fd",
      marginTop: 80,
      maxWidth: 220,
    },
  }));

  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List className={classes.mainList}>{mainListItems}</List>
      </Drawer>
    </div>
  );
}
