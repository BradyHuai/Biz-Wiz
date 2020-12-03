import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import bwlogo from "../Images/bwlogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 90,
    marginLeft: 220,
    marginBottom: 10,
    height: "100%",
    textAlign: "left",
  },
  paper: {
    margin: 10,
  },
  postingtitle: {
    textAlign: "left",
    padding: 20,
  },

  cardGrid: {
    alignItems: "center",
  },
  item: {
    margin: 20,
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
}));

const posts = [{ title: "Example", desc: "Example", id: 1 }];

const userinfo = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  postal_code: "",
  address: "",
  short_paragraph: "",
};

export default function ProfilePage() {
  const classes = useStyles();
  const history = useHistory();
  const username = useSelector((state) => state.userinfo.username);
  const handleViewPost = (post_id) => () => {
    history.push({
      pathname: "/pages/post",
      search: "?the=search",
      state: { id: post_id },
    });
  };

  // const handleEditPost = (post_id) => () => {
  //   history.push({
  //     pathname: "/pages/post-job",
  //     search: "?the=search",
  //     state: { id: post_id },
  //   });
  // }

  const handleInputId = (event) => {
    setData({
      ...data,
      username: event.target.value,
    });
  };

  const [data, setData] = useState({
    posts: posts,
    userinfo: userinfo,
  });

  const handleChangeProfile = () => {
    (async () => {
      const posts_url = "http://localhost:8000/api/profile";
      const profile = await axios.get(posts_url, {
        params: { username: data.username },
      });
      console.log(data.username);
      console.log(profile);
      if ("error" in profile.data) {
        alert(profile.data["error"]);
      } else {
        setData({
          ...data,
          posts: profile.data.posts,
          userinfo: profile.data.userinfo,
        });
        console.log(data);
      }
    })().catch((e) => {
      console.log("Invalid Username");
      alert("Invalid Username");
    });
    // eslint-disable-next-line
  };

  useEffect(() => {
    (async () => {
      const posts_url = "http://localhost:8000/api/profile";

      const profile = await axios.get(posts_url, {
        params: { username: username },
      });
      console.log(profile);
      if ("error" in profile.data) {
        alert("Not Logged In");
      } else {
        setData({
          ...data,
          posts: profile.data.posts,
          userinfo: profile.data.userinfo,
        });
      }
    })();
    // eslint-disable-next-line
  }, [username]);

  if (data.userinfo === {}) {
    return <span>waiting... </span>;
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined">
          <img src={bwlogo} style={{ margin: 10 }} alt=""></img>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Email: {data.userinfo.email}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Address: {data.userinfo.address}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Website: {data.userinfo.website}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Contact Person: {data.userinfo.first_name} {data.userinfo.last_name}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Company Description: {data.userinfo.short_paragraph}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <TextField
            name="profile"
            label="Business/Email"
            variant="outlined"
            style={{
              textAlign: "left",
              margin: 10,
            }}
            defaultValue={"Business/Email"}
            onChange={handleInputId}
          ></TextField>
          <Button
            style={{
              textAlign: "left",
              backgroundColor: "#e3f2fd",
              margin: 10,
            }}
            onClick={handleChangeProfile}
          >
            View A Company Profile
          </Button>
        </Paper>
      </Paper>

      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.postingtitle}>
          Postings
        </Typography>
        <Grid container className={classes.cardGrid}>
          {data.posts.map((card) => (
            <Grid
              item
              className={classes.item}
              xs={2}
              sm={2}
              md={2}
              key={card.id}
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography>{card.desc}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={handleViewPost(card.id)}
                  >
                    View
                  </Button>
                  {/* <Button 
                    size="small" 
                    color="primary"
                    onClick={handleEditPost(card.id)}
                  >
                    Edit
                  </Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
