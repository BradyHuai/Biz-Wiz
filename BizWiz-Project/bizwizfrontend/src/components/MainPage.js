import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const myStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <Paper>
          <Button> Go to page 1</Button>
          <Button> Go to page 2</Button>
          <Button> Go to page 3</Button>
        </Paper>
      </div>
    );
  }
}
