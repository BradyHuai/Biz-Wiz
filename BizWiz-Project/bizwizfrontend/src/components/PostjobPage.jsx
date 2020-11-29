import React, { useState }from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
        root: {
        marginTop: 90,
        marginLeft: 220,
        marginBottom: 10,
        height: "100%",
        textAlign: "left",
        },
        form: {
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "100px",
            height: "100%",
            width: "80%",
        },
        boxText: {
            marginTop: "20px"
        },
        buttonsave: {
            margin: theme.spacing(1),
            float: "right",
            color: "#000000",
            backgroundColor: "#f1c418",
            fontFamily: 'Acumin Variable Concept',
        },
        buttondelete: {
            margin: theme.spacing(1),
            float: "right",
            color: "#000000",
            backgroundColor: "#eaeced",
            fontFamily: 'Acumin Variable Concept',
        },
        titles: {
            fontSize: "1.8em",
            fontWeight: "bold",
            fontFamily: 'Acumin Variable Concept',
        },
    })
);

export default function Postjob() {
    const classes = useStyles();

    const initialData = {
        "business": -1,
        "position": "",
        "post_title": "",
        "address": "",
        "zip_code": "",
        "city": "",
        "salary": "",
        "deadline": "",
        "description": "",
        "small_description": "",
        "requirements": "",
        "notes": "",
    };
    const [data, setdata] = useState(initialData);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setdata(previousData =>({
            ...previousData,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        const url = "http://localhost:8000/api/post";

        axios({
          method: "post",
          url: url,
          data: data,
        })
          .then((res) => {
            if (res.status === 200) {
              console.log("success");
              alert("Posting submitted!")
            } else {
                alert("Invalid input, please check your inputs.")
              console.log(res.status);
            }
          })
          .catch((e) => {
            alert("Invalid input, please check your inputs.")
            console.log(e);
          });
    }

    const handleDelete = (e) => {
        setdata(previousData =>({
            ...previousData,
            ...initialData
        }));
        // go back
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <form autoComplete="off" className={classes.form}>
                <Typography className={classes.titles} >
                    BASIC INFORMATION
                </Typography>
                
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            name="business" 
                            label="Your Business ID" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required
                            />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            className={classes.textfield}
                            name="position" 
                            label="Position type" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            className={classes.textfield}
                            name="post_title" 
                            label="Job Title" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            className={classes.textfield}
                            name="address" 
                            label="address" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            className={classes.textfield}
                            name="zip_code" 
                            label="zip code" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            name="city" 
                            label="city" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            name="salary" 
                            label="Salary" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                </Grid>
                <br />
                <Typography className={classes.titles}>
                    MORE ABOUT THIS JOB
                </Typography>
                <Grid container spacing={3}>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            name="deadline" 
                            label="Deadline" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <TextField 
                            name="link" 
                            label="Application link" 
                            variant="outlined" 
                            onChange={handleChange} 
                            fullWidth 
                            required />
                    </Grid>
                </Grid>
                <TextField 
                    name="description" 
                    className={classes.boxText} 
                    label="Detailed description about this job" 
                    variant="outlined" 
                    onChange={handleChange} 
                    fullWidth 
                    multiline 
                    rows={8}/>
                <TextField 
                    name="requirements" 
                    className={classes.boxText} 
                    label="Job requirements" 
                    variant="outlined" 
                    onChange={handleChange} 
                    fullWidth 
                    multiline 
                    rows={8}/>
                <TextField 
                    name="notes" 
                    className={classes.boxText} 
                    label="Additional notes" 
                    variant="outlined" 
                    onChange={handleChange} 
                    fullWidth 
                    multiline 
                    rows={8}/>
                <Button
                    variant="contained"
                    className={classes.buttondelete}
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete} 
                >
                    Delete
                </Button>
                <Button
                    variant="contained"
                    className={classes.buttonsave}
                    startIcon={<PostAddIcon />}
                    onClick={handleSubmit} 
                >
                    POST
                </Button>
            </form>
        </div>
    );
}