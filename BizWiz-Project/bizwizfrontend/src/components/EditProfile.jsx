import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";

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

export default function EditProfile() {
  const classes = useStyles();

  const [values, setValues] = useState({
    address: "",
    email: "",
    contact: "",
    website: "",
  });

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSave = () => {
    const url = "http://localhost:8000/api/profile-change/";

    axios({
      method: "patch",
      url: url,
      data: values,
    })
      .then((res) => {
        if (res.status == 200) {
          console.log("success");
        } else {
          console.log(res.status);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined">
          <img src="/images/bwlogo.png" style={{ margin: 10 }} alt=""></img>
        </Paper>

        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Website:
          </Typography>
          <TextField
            defaultValue={"bizwiz.ca"}
            className={classes.postingtitle}
            onChange={handleChangeForm("website")}
          ></TextField>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Email:
          </Typography>
          <TextField
            defaultValue={"bizwiz@bizwiz.ca"}
            className={classes.postingtitle}
            onChange={handleChangeForm("email")}
          ></TextField>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Address:
          </Typography>
          <TextField
            defaultValue={"123 Bizwiz Street"}
            className={classes.postingtitle}
            onChange={handleChangeForm("address")}
          ></TextField>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Contact:
          </Typography>
          <TextField
            defaultValue={"Michelle"}
            className={classes.postingtitle}
            onChange={handleChangeForm("contact")}
          ></TextField>
        </Paper>
        <Paper variant="outlined">
          <Button
            className={classes.postingtitle}
            style={{ backgroundColor: "#e3f2fd", margin: 10 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}
