import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  barColored: {
    background: "linear-gradient(45deg, #2979ff 30%, #2196f3 90%)",
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
    color: "white",
  },
  icon: {
    height: "70%",
    width: "70%",
  },
  buttons: {
    background: "rgba(67, 129, 168,0.5)",
    border: 0,
    borderRadius: 10,
    color: "white",
    marginLeft: 20,
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const [appBarBg, setappBarBg] = useState(
    window.location.href === "http://localhost:3000/"
      ? "transparent"
      : "barColored"
  );
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
            <img className={classes.icon} src="/images/bwlogo.png" alt="" />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Biz-Wiz Community Board
          </Typography>
          <Button className={classes.buttons} onClick={handleClickSignin}>
            sign in
          </Button>
          <Button className={classes.buttons} onClick={handleClickStart}>
            get started
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
