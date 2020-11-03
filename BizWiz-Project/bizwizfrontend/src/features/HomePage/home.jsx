import React from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { mainListItems } from './sidebar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
  },
  mainList: {
    margin: 20,
  },
  drawerPaper: {
    backgroundColor: "#e3f2fd"
  }
}));

export default function Home() {
  const classes = useStyles();
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
