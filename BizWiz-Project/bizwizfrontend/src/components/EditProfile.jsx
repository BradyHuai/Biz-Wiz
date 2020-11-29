import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
    fontSize: "1.8em",
    fontWeight: "bold",
    fontFamily: 'Acumin Variable Concept'
  },
  button: {
    margin: theme.spacing(1),
    textAlign: "left",
    backgroundColor: "#f1c418",
    margin: 20, 
    width: 200,
  },
}));

export default function EditProfile() {
  const classes = useStyles();

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal_code: "",
    website: "",
    username: "",
  });

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const username = useSelector((state) => state.userinfo.username);

  const handleSave = () => {
    const url = "http://localhost:8000/api/profile";

    console.log(values);
    axios({
      method: "post",
      url: url,
      data: { ...values, username: username },
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          alert("Success");
        } else {
          console.log(res.status);
          alert("Failed");
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
        <Paper variant="outlined" style={{ padding: 10 }}>
          <Typography variant="h4" className={classes.postingtitle}>
            Change Profile
          </Typography>
        </Paper>
        <Paper variant="outlined" style={{ padding: 10 }}>
          <Grid container spacing={3}>
            <Grid item md={8} sm={12} xs={12}>
              <Typography>Logged In As: {username}</Typography>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="first_name"
                label="Your First Name"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("first_name")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="Last Name"
                label="Your Last Name"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("last_name")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="Website"
                label="Your Website"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("website")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="Email"
                label="Your Email"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("email")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="Address"
                label="Your Address"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("address")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="City"
                label="Your City"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("city")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="Postal_Code"
                label="Your Postal Code"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("postal_code")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="Phone"
                label="Your Contact Phone Number"
                variant="outlined"
                defaultValue={""}
                className={classes.postingtitle}
                onChange={handleChangeForm("phone")}
                fullWidth
                required
              ></TextField>
            </Grid>
          </Grid>
        </Paper>
        <Paper>
          <Button
            className={classes.button}
            onClick={handleSave}
          >
            Save
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}
