import React from "react";
import { Button, Typography, Paper } from "@material-ui/core";
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

  paperbutton: {
    width: 300,
    height: 640,
    position: "absolute",
    padding: "8px",
    top: "20%",
    left: "50%",
    marginLeft: -150,
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

function PortalPage() {
  const classes = myStyles();
  const history = useHistory();
  const handleClickBusiness = () => {
    history.push("/sign-up-business");
  };
  const handleClickIndividual = () => {
    history.push("/sign-up-individual");
  };
  const handleClickGuest = () => {
    history.push("/pages/profilepage");
  };
  return (
    <div>
      <Grid container className={classes.root} direction="column">
        <CssBaseline />
        <Grid item sm={true} md={true} lg={true} className={classes.image} />
      </Grid>

      <Paper className={classes.paperbutton}>
        <Typography variant="h6" className={classes.text}>
          ● I am A
        </Typography>
        <Button className={classes.buttons} onClick={handleClickBusiness}>
          Business owner
        </Button>
        <Button className={classes.buttons} onClick={handleClickIndividual}>
          Individual searching for work
        </Button>
      </Paper>
    </div>
  );
}
export default PortalPage;
