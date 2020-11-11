import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#bbdefb",
  },
  buttons: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Profiles() {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>
          User Profile
        </Typography>
        <AccountCircleIcon style={{ fontSize: 100 }} />
        <div className={classes.buttons}>
          <Fab color="primary" aria-label="add" size="small">
            <AddIcon />
          </Fab>
          <Fab color="secondary" aria-label="edit" size="small">
            <EditIcon />
          </Fab>
        </div>
      </div>
    </React.Fragment>
  );
}
