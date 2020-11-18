import React, { FunctionComponent, useState } from "react";
import { Grid, TextField, Divider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 90,
      marginLeft: 220,
      marginBottom: 10,
      height: "100%",
      textAlign: "left",
    },
    })
);


export default function Postjob() {
    const classes = useStyles();
    return (
        <form autoComplete="off" className={classes.root}>
          <Typography variant="h6">
        Basic Information
      </Typography>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12} xs={12}>
              <TextField label="First Name" variant="outlined" fullWidth required />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField label="Last Name" variant="outlined" fullWidth required />
            </Grid>
          </Grid>
          <Typography variant="h6">
        More about this job
      </Typography>
          <Grid container spacing={3}>
            <Grid item md={6} sm={12} xs={12}>
              <TextField label="City" variant="outlined" fullWidth />
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <TextField label="Region" variant="outlined" fullWidth />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            label="Occupation"
            fullWidth
          />
          <Divider />
        </form>
    );
}