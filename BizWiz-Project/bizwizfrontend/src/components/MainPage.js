import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
const myStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    position: "fixed",
  },
  paper: {
    width: "100%",
    height: 500,
    position: "absolute",
    left: "50%",
    top: "50%",
    marginLeft: "-50%",
    marginTop: -250,
    padding: "8px",
    margin: "4px",
  },
  buttons: {
    background: "rgba(67, 129, 168,0.5)",
    border: 0,
    borderRadius: 10,
    color: "white",
    height: 64,
    width: 128,
    margin: 36,
    marginTop: "80vh",
    padding: "30px",
  },

  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

function MainPage() {
  const classes = myStyles();
  const history = useHistory();
  const handleClickLogin = () => {
    history.push("/login");
  };
  const handleClickVisit = () => {
    history.push("/pages/home");
  };
  return (
    <div>
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item sm={true} md={true} lg={true} className={classes.image} />
      </Grid>
      <Button className={classes.buttons} onClick={handleClickLogin}>
        Login
      </Button>
      <Button className={classes.buttons} onClick={handleClickVisit}>
        Visit as Guest
      </Button>
    </div>
  );
}
export default MainPage;
