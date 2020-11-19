import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

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

const posts = [
  { title: "Need volunteers", desc: "for museum tour", id: 1 },
  { title: "Need parttime", desc: "for paint job", id: 2 },
  { title: "Hiring", desc: "event organizer", id: 3 },
  { title: "Need web developer", desc: "for free labour", id: 4 },
];

const userinfo = {
  first_name: "Biz",
  last_name: "Wiz",
  id: 1,
  email: "bw@bw.com",
  phone: "123456",
  address: "123 bw st",
  website: "biz-wiz.ca",
};
export default function ProfilePage() {
  const classes = useStyles();
  const history = useHistory();
  const handleViewPost = () => {
    history.push("/pages/post");
  };

  const [data, setData] = useState({ userid: "", posts: [], userinfo: {} });
  useEffect(() => {
    const id_url = "http://localhost:8000/api/user/";
    axios
      .get(id_url)
      .then((res) => {
        setData({ ...data, userid: res.data });
      })
      .catch((e) => {
        console.log(e);
      });

    const posts_url = "http://localhost:8000/api/profile/";
    axios({
      method: "get",
      url: posts_url,
      data: data.userid,
    })
      .then((res) => {
        setData({
          ...data,
          posts: res.data.posts,
          userinfo: res.data.userinfo,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined">
          <img src="/images/bwlogo.png" style={{ margin: 10 }} alt=""></img>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Website: {userinfo.website}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Email: {userinfo.email}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Address: {userinfo.address}
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Contact: {userinfo.first_name} {userinfo.last_name}
          </Typography>
        </Paper>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.postingtitle}>
          Postings
        </Typography>
        <Grid container className={classes.cardGrid}>
          {posts.map((card) => (
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
                  <Button size="small" color="primary" onClick={handleViewPost}>
                    View
                  </Button>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
