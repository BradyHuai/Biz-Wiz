import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";

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
  },
}));

export default function EditApplication() {
  const classes = useStyles();

  const [values, setValues] = useState({
    num_questions: 5,
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    post: 1
  });

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  

  // want to get the application from api then update
  const getApplication = () => {
    // axios({
    //     method: 'get',
    //     url:'http://localhost:8000/api/application-detail/2'  
    //  })
    //  .then(res => {console.log(res)})
    //  .catch(err => console.error(err))
    fetch('http://localhost:8000/api/application-detail/2')
    .then(res => res.json())
    .then(data =>
        console.log(data)
        )
    
  }
  

//   update the application (not working rn)
  const handleSave = () => {
    const url = "http://localhost:8000/api/application-update/2";

    console.log(values);
    axios({
      method: "post",
      url: url,
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          alert("Success");
        } else {
          console.log(res.status);
          alert("Failed");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper variant="outlined" style={{ padding: 10 }}>
          <Typography variant="h4" className={classes.postingtitle}>
            Edit Screening Questions
          </Typography>
        </Paper>
        <Paper variant="outlined" style={{ padding: 10 }}>
          <Grid container spacing={3}>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="q1"
                label="The First Question"
                variant="outlined"
                defaultValue={values.q1}
                className={classes.postingtitle}
                onChange={handleChangeForm("q1")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="q2"
                label="The Second Question"
                variant="outlined"
                defaultValue={values.q2}
                className={classes.postingtitle}
                onChange={handleChangeForm("q2")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="q3"
                label="The Third Question"
                variant="outlined"
                defaultValue={values.q3}
                className={classes.postingtitle}
                onChange={handleChangeForm("q3")}
                fullWidth
                required
              ></TextField>
            </Grid> 
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="q4"
                label="The Fourth Question"
                variant="outlined"
                defaultValue={values.q4}
                className={classes.postingtitle}
                onChange={handleChangeForm("q4")}
                fullWidth
                required
              ></TextField>
            </Grid> 
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="q5"
                label="The Fifth Question"
                variant="outlined"
                defaultValue={values.q5}
                className={classes.postingtitle}
                onChange={handleChangeForm("q5")}
                fullWidth
                required
              ></TextField>
            </Grid>            
          </Grid>
        </Paper>
        <Paper>
          <Button
            className={classes.postingtitle}
            style={{ backgroundColor: "#e3f2fd", margin: 20, width: 200 }}
            onClick={getApplication }
          >
            Save
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}
