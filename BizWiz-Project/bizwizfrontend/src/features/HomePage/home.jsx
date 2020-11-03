import React from 'react';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { mainListItems } from './sidebar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import clsx from 'clsx';

import Profiles from './profile';
import Announcements from './announcements';
import Posts from './posts';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  mainList: {
    margin: 20,
    maxWidth: 190,
  },
  drawerPaper: {
    backgroundColor: "#e3f2fd"
  },
  content: {
    position: "static",
  },
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: "#bbdefb"
  },
  fixedHeight: {
    height: 240,
  },
  container: {
    marginTop: "5%",
    marginLeft: 200,
    marginRight: "5%",
    backgroundColor: "#e3f2fd",
    width: 1200,
  },
}));

export default function Home() {
  const theme = useTheme();
  const classes = useStyles(theme);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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

          <main className={classes.content}>
            <Container maxWidth="lg">
              
              <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={classes.paper}>
                    <Announcements />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper className={fixedHeightPaper}>
                    <Posts />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <Profiles />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </main>
        </div>
    );
}
