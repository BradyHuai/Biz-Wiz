import React from "react";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
const myStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    position: "fixed",
  },
  paperwhy: {
    width: 660,
    height: 300,
    position: "absolute",
    padding: "8px",
    top: "60%",
    margin: "20px",
    background: "linear-gradient(45deg, #2979ff 30%, #2196f3 90%)",
  },
  paperhead: {
    width: 660,
    height: 300,
    position: "absolute",
    padding: "8px",
    top: "20%",
    margin: "20px",
    background: "linear-gradient(45deg, #2979ff 30%, #2196f3 90%)",
  },

  buttons: {
    background: "rgba(67, 129, 168,0.5)",
    border: 0,
    borderRadius: 10,
    color: "white",
    height: 80,
    width: 200,
    margin: 36,
  },
  text: {
    color: "white",
    margin: 20,
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
  return (
    <div>
      <Grid container className={classes.root} direction="column">
        <CssBaseline />
        <Grid item sm={true} md={true} lg={true} className={classes.image} />
      </Grid>
      <Paper className={classes.paperhead}>
        <Typography variant="h6" className={classes.text}>
          ● Welcome to Biz-Wiz’s community board!
        </Typography>
        <Typography variant="body1" className={classes.text}>
          We are committed to connecting small business owners to each other
          with a geographic-based community board, to expand your current
          business efforts.
        </Typography>
      </Paper>
      <Paper className={classes.paperwhy}>
        <Typography variant="h6" className={classes.text}>
          ● Why Biz-Wiz is right for you
        </Typography>
        <Typography variant="body1" className={classes.text}>
          1. We verify the small businesses so you don’t have to
        </Typography>
        <Typography variant="body1" className={classes.text}>
          2. We have firsthand experience as small business owners to support
          your journey
        </Typography>
        <Typography variant="body1" className={classes.text}>
          3. We offer free, premium, and deluxe user accounts to suit your
          business needs
        </Typography>
      </Paper>
    </div>
  );
}
export default MainPage;
