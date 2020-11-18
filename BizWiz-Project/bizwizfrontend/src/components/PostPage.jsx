import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 90,
    marginLeft: 220,
    marginBottom: 10,
    height: "100%",
    textAlign: "left",
  },
  paper: {
    margin: 10,
  },
  postingtitle: {
    textAlign: "left",
    padding: 20,
  },
}));

export default function PostPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined">
          <img src="/images/bwlogo.png" style={{ margin: 10 }}></img>
        </Paper>

        <Paper variant="outlined">
          <Typography variant="body1" className={classes.postingtitle}>
            Website: biz-wiz.ca
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="body1" className={classes.postingtitle}>
            Email: bizwiz@bizwiz.ca
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="body1" className={classes.postingtitle}>
            Address: 123 Bizwiz Street
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="body1" className={classes.postingtitle}>
            Contact: Michelle
          </Typography>
        </Paper>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="h6" className={classes.postingtitle}>
            JOB POSTING INFORMATION
        </Typography>
      </Paper>
    </div>
  );
}
