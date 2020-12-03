import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontSize: "1.4em",
    fontFamily: "Acumin Variable Concept",
    fontWeight: "bold",
  },
}));

export default function MainListItems() {
  const user_type = useSelector((state) => state.userinfo.user_type);
  const classes = useStyles();

  const history = useHistory();
  const handleClickProfile = () => {
    history.push("/pages/profilepage");
  };
  // const handleClickDashboard = () => {
  //   history.push("/pages/home");
  // };

  const handleClickSearch = () => {
    history.push("/search");
  };

  const handleClickEditProfile = () => {
    history.push("/pages/edit");
  };

  const handleClickAddPost = () => {
    history.push("/pages/post-job");
  };
  return (
    <div>
      {/* <ListItem button onClick={handleClickDashboard}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem> */}
      <ListItem button onClick={handleClickSearch}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          className={classes.listItemText}
          primary="Search Jobs"
        />
      </ListItem>
      <ListItem button onClick={handleClickProfile}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          className={classes.listItemText}
          primary="Profile"
        />
      </ListItem>

      {user_type === "business" || user_type === "individual" ? (
        <ListItem button onClick={handleClickEditProfile}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className={classes.listItemText}
            primary="Edit Profile"
          />
        </ListItem>
      ) : (
        <></>
      )}
      {user_type === "business" ? (
        <ListItem button onClick={handleClickAddPost}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            disableTypography
            className={classes.listItemText}
            primary="Add Job Posting"
          />
        </ListItem>
      ) : (
        <></>
      )}
    </div>
  );
}
