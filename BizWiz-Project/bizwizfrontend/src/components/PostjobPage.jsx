import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Grid, TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import PostAddIcon from "@material-ui/icons/PostAdd";
import axios from "axios";
import { useSelector } from "react-redux";

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
    marginTop: "20px",
  },
  buttonsave: {
    margin: theme.spacing(1),
    float: "right",
    color: "#000000",
    backgroundColor: "#f1c418",
    fontFamily: "Acumin Variable Concept",
  },
  buttondelete: {
    margin: theme.spacing(1),
    float: "right",
    color: "#000000",
    backgroundColor: "#eaeced",
    fontFamily: "Acumin Variable Concept",
  },
  titles: {
    fontSize: "1.8em",
    fontWeight: "bold",
    fontFamily: "Acumin Variable Concept",
  },
}));

export default function Postjob() {
  const classes = useStyles();
  // const history = useHistory();
  const username = useSelector((state) => state.userinfo.username);

  const history = useHistory();
  const handleReject = () => {
    history.push("/");
  };
  const user_type = useSelector((state) => state.userinfo.user_type);
  useEffect(() => {
    if (user_type !== "business" && user_type !== "individual") {
      handleReject();
    }
  });

  const initialData = {
    position: "",
    post_title: "",
    address: "",
    zip_code: "",
    city: "",
    salary: "",
    link: "",
    deadline: "",
    small_description: "",
    description: "",
    requirements: "",
    notes: "",
    business: username,
  };
  const [data, setdata] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Potential edit post function

  // let id = -1;

  // useEffect(() => {
  //   (async () => {
  //       try {
  //             id = history.location.state.id;
  //             const posting_url = "http://localhost:8000/api/post";
  //             const post = await axios.get(posting_url, { params: { id: id } });

  //             setdata({
  //             position: post.data.position,
  //             post_title: post.data.title,
  //             address: post.data.location,
  //             zip_code: post.data.zip_code,
  //             city: post.data.city,
  //             salary: post.data.salary,
  //             link: post.data.link,
  //             deadline: post.data.deadline,
  //             description: post.data.description,
  //             requirements: post.data.requirements,
  //             notes: post.data.notes,
  //             });
  //             setOtherData(post.data.company);
  //       } catch (error) {

  //       }

  //   })();

  // }, []);

  const isEqual = (str1, str2) => {
    return str1 === str2;
  };

  const handleSubmit = (e) => {
    if (
      isEqual(data.position, "") ||
      isEqual(data.post_title, "") ||
      isEqual(data.salary, "") ||
      isEqual(data.city, "") ||
      isEqual(data.zip_code, "") ||
      isEqual(data.address, "") ||
      isEqual(data.small_description, "") ||
      data.small_description.length > 50 ||
      data.post_title.length > 50
    ) {
      alert("Invalid Input");
    } else {
      const url = "http://localhost:8000/api/post";

      axios({
        method: "post",
        url: url,
        data: data,
      })
        .then((res) => {
          if (res.status === 200) {
            console.log("success");
            alert("Posting submitted!");
          } else {
            alert("Invalid input, please check your inputs.");
            console.log(res.status);
          }
        })
        .catch((e) => {
          alert("Invalid input, please check your inputs.");
          console.log(e);
        });
    }
    //   if (id != -1) {
    //     axios({
    //         method: "delete",
    //         url: url,
    //         data: id,
    //       })
    //         .then((res) => {
    //           if (res.status !== 200) {
    //             alert("Invalid input, please check your inputs.")
    //             console.log(res.status);
    //           }
    //         })
    //         .catch((e) => {
    //           alert("Internal server error.")
    //           console.log(e);
    //         });
    // }
  };

  const handleDelete = (e) => {
    setdata((previousData) => ({
      ...previousData,
      ...initialData,
    }));
    window.location.reload(false);
  };

  const titleError =
    isEqual(data.post_title, "") || data.post_title.length > 50;
  const descError =
    isEqual(data.small_description, "") || data.small_description.length > 50;

  if (data.post_title.length > 50) {
    var lineTooLong1 = "Line too Long";
  } else {
    lineTooLong1 = "";
  }

  if (data.small_description.length > 50) {
    var lineTooLong2 = "Line too Long";
  } else {
    lineTooLong2 = "";
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <form autoComplete="off" className={classes.form}>
        <Typography className={classes.titles}>BASIC INFORMATION</Typography>

        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="business"
              label="Your Email"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              disabled
              defaultValue={username}
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
              required
              error={isEqual(data.position, "")}
              // defaultValue={initialData.position}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              className={classes.textfield}
              name="post_title"
              label="Job Title"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              error={titleError}
              helperText={lineTooLong1}
              // defaultValue={initialData.post_title}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              className={classes.textfield}
              name="address"
              label="address"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              error={isEqual(data.address, "")}
              // defaultValue={initialData.address}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              className={classes.textfield}
              name="zip_code"
              label="zip code"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              error={isEqual(data.zip_code, "")}
              // defaultValue={initialData.zip_code}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="city"
              label="city"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              error={isEqual(data.city, "")}
              // defaultValue={initialData.city}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="salary"
              label="Salary"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              error={isEqual(data.salary, "")}
              // defaultValue={initialData.salary}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="small_description"
              label="Short Description about this position"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              required
              error={descError}
              helperText={lineTooLong2}
            />
          </Grid>
        </Grid>
        <br />
        <Typography className={classes.titles}>MORE ABOUT THIS JOB</Typography>
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="deadline"
              label="Deadline"
              variant="outlined"
              onChange={handleChange}
              fullWidth
              // defaultValue={initialData.deadline}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              name="link"
              label="Application link"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
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
          rows={8}
          // defaultValue={initialData.description}
        />
        <TextField
          name="requirements"
          className={classes.boxText}
          label="Job requirements"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          multiline
          rows={8}
          // defaultValue={initialData.requirements}
        />
        <TextField
          name="notes"
          className={classes.boxText}
          label="Additional notes"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          multiline
          rows={8}
          // defaultValue={initialData.notes}
        />
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
