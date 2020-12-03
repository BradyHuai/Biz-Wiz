import React, { useState, useEffect }from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  },
}));

export default function EditApplication() {
  const classes = useStyles();

  const [values, setValues] = useState({
    id: "",
    q1: "Are you interested in working remotely?",
    q2: "When are you able to start working?",
    q3: "How much would you like to earn in this position?",
    q4: "How would you like to communicate with us?",
    q5: "Do you have any specific questions about this role?"
  });

//   const [id, setID] = useState({id: ""})

//   const id = history.location.state.id;

//   useEffect(() => {
//     (async () => {
//       const posting_url = "http://localhost:8000/api/application";
//       const app = await axios.get(posting_url, {params: {id: id}});

//       console.log(app.data)
//       setValues({
//         q1: app.data.q1,
//       });
//     })();
//   }, []);

//   const createApplication = () => {
//     const url = "http://localhost:8000/api/application";
//     const data = {
//         q1: "Are you interested in working remotely?",
//         q2: "When are you able to start working?",
//         q3: "How much would you like to earn in this position?",
//         q4: "How would you like to communicate with us?",
//         q5: "Do you have any specific questions about this role?"}
//     axios({
//         method: "post",
//         url: url,
//         data: data,
//     })
//         .then((res) => {
//         if (res.status === 200) {
//             console.log("success");
//             alert("Application created!")
//         } else {
//             alert("Invalid input, please check your inputs.")
//             console.log(res.status);
//         }
//         })
//         .catch((e) => {
//         alert("Invalid input, please check your inputs.")
//         console.log(e);
//         });
//   }

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  // want to get the application from api then update
  const getApplication = () => {
    // console.log(values.id)
    // console.log(values)
    if (values.id == ""){
        alert("Please enter an Application ID")
        return
    }
    axios({
        method: 'get',
        url:'http://localhost:8000/api/application' ,
        params: {id: values.id}
     })
     .then(res => {
        //  console.log("heres the res data")
        //  console.log(res.data)
         setValues({
            id: res.data.id,
            q1: res.data.q1,
            q2: res.data.q2,
            q3: res.data.q3,
            q4: res.data.q4,
            q5: res.data.q5
          });
        //   console.log(res.data.error)
            if(res.data.error == "Application not found...") {
                // console.log("helos")
                setDefault()
            }
        })
     .catch(err => console.error(err))
  }
  
  const setDefault = () => {
    console.log("setting to default")
    setValues({
        id: values.id,
        q1: "Are you interested in working remotely?",
        q2: "When are you able to start working?",
        q3: "How much would you like to earn in this position?",
        q4: "How would you like to communicate with us?",
        q5: "Do you have any specific questions about this role?"
    });
  }

//   update the application 
  const handleSave = () => {
    if (values.id == ""){
        alert("Please enter an Application ID")
        return
    }
    const url = "http://localhost:8000/api/application";

    // console.log(values.id)
    // console.log(values);
    axios({
      method: "post",
      url: url,
      data: values,
    })
      .then((res) => {
        if (res.status === 200) {
          console.log("save success");
        //   console.log(res.data)
        //   alert("Success");
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
                name="id"
                label="Application ID"
                variant="outlined"
                value={values.id}
                className={classes.postingtitle}
                onChange={handleChangeForm("id")}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="q1"
                label="The First Question"
                variant="outlined"
                value={values.q1}
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
                value={values.q2}
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
                value={values.q3}
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
                value={values.q4}
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
                value={values.q5}
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
            onClick={getApplication}
          >
            View
          </Button>
          <Button
            className={classes.postingtitle}
            style={{ backgroundColor: "#e3f2fd", margin: 20, width: 200 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Paper>
      </Paper>
    </div>
  );
}
