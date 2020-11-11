import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    background: "rgba(67, 129, 168,0.5)",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
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
    history.push("/login");
  };
  const handleClickVisit = () => {
    history.push("/portal");
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
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Button className={classes.buttons} onClick={handleClickSignin}>
            sign in
          </Button>
          <Button className={classes.buttons} onClick={handleClickVisit}>
            get started
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
