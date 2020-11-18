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
        form: {
            margin: "20px",
            height: "100%",
            width: "80%",
        },
        boxText: {
            marginTop: "20px"
        }
    })
);


export default function Postjob() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <form autoComplete="off" className={classes.form}>
                <Typography variant="h6">
                    Basic Information
                </Typography>
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField label="Position type" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField label="Job Title" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField label="Location" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField label="Salary" variant="outlined" fullWidth required />
                    </Grid>
                </Grid>
                <br />
                <Typography variant="h6">
                    More about this job
                </Typography>
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField label="Deadline" variant="outlined" fullWidth required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField label="Application link" variant="outlined" fullWidth required />
                    </Grid>
                </Grid>
                <TextField className={classes.boxText} label="Detailed description about this job" variant="outlined" fullWidth multiline rows={4}/>
                <TextField className={classes.boxText} label="Job requirements" variant="outlined" fullWidth multiline rows={4}/>
                <TextField className={classes.boxText} label="Additional notes" variant="outlined" fullWidth multiline rows={4}/>
            </form>
        </div>
    );
}