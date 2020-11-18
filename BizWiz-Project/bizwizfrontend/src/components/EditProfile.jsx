import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, TextField } from "@material-ui/core";
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

const cards = [
  { title: "Need volunteers", desc: "for museum tour" },
  { title: "Need parttime", desc: "for paint job" },
  { title: "Hiring", desc: "event organizer" },
  { title: "Need a web developer", desc: "for free labour" },
];

export default function EditProfile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined">
          <img src="/images/bwlogo.png" style={{ margin: 10 }} alt=""></img>
          <Button>Edit</Button>
        </Paper>

        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Website:
          </Typography>
          <TextField
            defaultValue={"bizwiz.ca"}
            className={classes.postingtitle}
          ></TextField>
          <Button className={classes.postingtitle}>Save</Button>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Email:
          </Typography>
          <TextField
            defaultValue={"bizwiz@bizwiz.ca"}
            className={classes.postingtitle}
          ></TextField>
          <Button className={classes.postingtitle}>Save</Button>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Address:
          </Typography>
          <TextField
            defaultValue={"123 Bizwiz Street"}
            className={classes.postingtitle}
          ></TextField>
          <Button className={classes.postingtitle}>Save</Button>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Contact:
          </Typography>
          <TextField
            defaultValue={"Michelle"}
            className={classes.postingtitle}
          ></TextField>
          <Button className={classes.postingtitle}>Save</Button>
        </Paper>
      </Paper>
    </div>
  );
}
