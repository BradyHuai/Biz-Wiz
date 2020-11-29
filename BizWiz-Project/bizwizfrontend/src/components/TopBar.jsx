import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import image from "../Images/bwlogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  barColored: {
    background: "#f1c418",
    height: 80,
  },

  transparent: {
    height: 80,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "#f1c418",
  },
  icon: {
    height: "70%",
    width: "70%",
  },
  buttons: {
    background: "white",
    border: 0,
    borderRadius: 10,
    color: "#f1c418",
    marginLeft: 20,
    fontFamily: "Acumin Variable Concept",
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const username = useSelector((state) => state.userinfo.username);
  const [appBarBg, setappBarBg] = useState("barColored");
  const barRef = React.useRef();
  barRef.current = appBarBg;

  useEffect(() => {
    const handleClick = () => {
      setappBarBg("barColored");
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const history = useHistory();
  const handleClickLogo = () => {
    history.push("/");
  };
  const handleClickSignin = () => {
    history.push("/portal");
  };
  const handleClickStart = () => {
    history.push("/start");
  };
  return (
    <div className={classes.root}>
      <AppBar
        color={barRef.current === "barColored" ? "primary" : "transparent"}
        elevation={0}
        className={classes[barRef.current]}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleClickLogo}
          >
            <img className={classes.icon} src={image} alt="nothing" />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Biz-Wiz Community Board
          </Typography>
          {username === "" ? (
            <Button className={classes.buttons} onClick={handleClickSignin}>
              sign in
            </Button>
          ) : (
            <Typography>Hello {username}</Typography>
          )}
          <Button className={classes.buttons} onClick={handleClickStart}>
            get started
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
