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
import Container from "@material-ui/core/Container";

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

const cards = [
  { title: "Need volunteers", desc: "for museum tour" },
  { title: "Need parttime", desc: "for paint job" },
  { title: "Hiring", desc: "event organizer" },
];

export default function ProfilePage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined">
          <img src="/images/bwlogo.png" style={{ margin: 10 }}></img>
        </Paper>

        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Website: biz-wiz.ca
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Email: bizwiz@bizwiz.ca
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Address: 123 Bizwiz Street
          </Typography>
        </Paper>
        <Paper variant="outlined">
          <Typography variant="subtitle1" className={classes.postingtitle}>
            Contact: Michelle
          </Typography>
        </Paper>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h4" className={classes.postingtitle}>
          Postings
        </Typography>
        <Grid container className={classes.cardGrid} maxWidth="md">
          {cards.map((card) => (
            <Grid className={classes.item} xs={2} sm={2} md={2}>
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
                  <Button size="small" color="primary">
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
