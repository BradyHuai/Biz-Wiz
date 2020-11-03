import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  barColored: {
    background: "linear-gradient(45deg, #2979ff 30%, #2196f3 90%)",
    height: 80,
    position: "absolute",
  },

  transparent: {
    height: 80,
    position: "absolute",
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
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
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
}));

export default function TopBar() {
  const classes = useStyles();
  const [appBarBg, setappBarBg] = useState(
    window.location.href == "http://localhost:3000/"
      ? "transparent"
      : "barColored"
  );
  const barRef = React.useRef();
  barRef.current = appBarBg;

  useEffect(() => {
    const handleScroll = () => {
      if (barRef.current == "transparent") {
        setappBarBg("barColored");
      } else if (window.location.href != "http://localhost:3000/") {
        setappBarBg("barColored");
      } else {
        setappBarBg("transparent");
      }
    };
    document.addEventListener("click", handleScroll);
    return () => {
      document.removeEventListener("click", handleScroll);
    };
  }, []);

  const history = useHistory();
  const handleClickLogo = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar
        color={barRef.current}
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
            <img className={classes.icon} src="/images/bwlogo.png" />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Markekplace (Slogan)
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
