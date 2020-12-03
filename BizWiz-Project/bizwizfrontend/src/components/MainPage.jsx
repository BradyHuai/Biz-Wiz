import React from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import image from "../Images/main-page-background.jpg";
import why_bw_image from "../Images/why-bw.jpg";
import bw_desc from "../Images/bw-desc.jpg";
import community from "../Images/group-chat.png";
import financial from "../Images/dollar.png";
import chat from "../Images/chat.png";
import { useHistory } from "react-router";
const myStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 600,
    marginTop: 80,
  },
  paper: {
    background: "#f1c418",
    height: 450,
    width: "60%",
    padding: 50,
  },
  paper2: {
    background: "#f1c418",
    height: 450,
    width: "40%",
  },
  paper3: {
    background: "#eaeced",
    height: 450,
    width: "60%",
    padding: 50,
  },

  paper4: {
    background: "white",
    height: 300,
    width: "100%",
    padding: 50,
  },
  text: {
    color: "white",
    padding: 50,
    fontSize: "2vw",
    fontFamily: "Acumin Variable Concept",
  },

  text0: {
    color: "black",
    padding: 50,
    fontSize: "3vw",
    fontFamily: "Acumin Variable Concept",
  },

  text2: {
    color: "black",
    fontSize: "1.5vw",
    padding: 10,
    fontFamily: "Acumin Variable Concept",
  },

  text3: {
    color: "black",
    fontSize: "2vw",
    fontFamily: "Acumin Variable Concept",
  },

  text4: {
    color: "black",
    fontSize: "1vw",
    fontFamily: "Acumin Variable Concept",
  },

  image: {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  pic: {
    width: "100%",
    height: "100%",
  },

  pic2: {
    background: "#eaeced",
    width: "30vh",
    height: "30vh",
    padding: 20,
    margin: "auto",
  },
  buttons: {
    background: "#f1c418",
    border: 0,
    borderRadius: 10,
    color: "white",
    fontFamily: "Acumin Variable Concept",
    height: "6.5vh",
    width: "10vw",
    margin: "2vw",
    fontSize: "0.75vw",
  },
}));

function MainPage() {
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

      <Paper className={classes.paper4}>
        <Typography variant="body1" className={classes.text0}>
          Biz-Wiz is your ultimate resource for entrepreneurship
        </Typography>
      </Paper>

      <Grid container align="center" style={{ padding: 20 }}>
        <Grid className={classes.pic2}>
          <img src={community} alt="" className={classes.pic}></img>
        </Grid>
        <Grid className={classes.pic2}>
          <img src={financial} alt="" className={classes.pic}></img>
        </Grid>
        <Grid className={classes.pic2}>
          <img src={chat} alt="" className={classes.pic}></img>
        </Grid>
      </Grid>

      <Grid container>
        <Paper className={classes.paper}>
          <Typography variant="body1" className={classes.text} align="left">
            We are committed to connecting small business owners to each other
            with a geographic-based community board, to expand your current
            business efforts.
          </Typography>
        </Paper>
        <Grid className={classes.paper2}>
          <img src={bw_desc} alt="" className={classes.pic}></img>
        </Grid>
      </Grid>

      <Grid container>
        <Grid className={classes.paper2}>
          <img src={why_bw_image} alt="" className={classes.pic}></img>
        </Grid>
        <Grid item className={classes.paper3}>
          <Typography variant="h6" className={classes.text2} align="left">
            ● Why Biz-Wiz is right for you
          </Typography>
          <Typography variant="body1" className={classes.text2} align="left">
            - We verify the small businesses so you don’t have to
          </Typography>
          <Typography variant="body1" className={classes.text2} align="left">
            - We have firsthand experience as small business owners to support
            your journey
          </Typography>
          <Typography variant="body1" className={classes.text2} align="left">
            - We offer free, premium, and deluxe user accounts to suit your
            business needs
          </Typography>
        </Grid>
      </Grid>
      <Paper className={classes.paper4}>
        <Typography variant="body1" className={classes.text3}>
          Let us help you find what you are looking for. <br></br>
        </Typography>
        <Typography variant="body1" className={classes.text4}>
          I am a...
        </Typography>
        <Button className={classes.buttons} onClick={handleClickBusiness}>
          {" "}
          Business Owner
        </Button>
        <Button className={classes.buttons} onClick={handleClickIndividual}>
          Individual looking for work
        </Button>
        <Button className={classes.buttons} onClick={handleClickGuest}>
          {" "}
          Guest User
        </Button>
      </Paper>
    </div>
  );
}
export default MainPage;
