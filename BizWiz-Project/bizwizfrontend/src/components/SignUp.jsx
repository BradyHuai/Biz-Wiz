import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import "./SignUp.css"
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: "120px 32px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();
  const handleSignIn = () => {
    history.push("/login");
  };

  const [values, setValues] = useState({
    "business_name": "",
    "username": "",
    "email": "",
    "first_name": "",
    "last_name": "",
    "industry": null,
    "password": "",
    "address": "",
    "zip_code": "",
    "city": "",
    "short_paragraph": ""
  });
  
  return <div className="container">
    <div className="title">
      Biz-Wiz Account Registration
    </div>
    
    <div className="signUp">
      <form style={{padding: "10px"}} onSubmit={(e) => {

        axios
        .post("http://localhost:8000/accounts/signup/business/", values)
        .then((res) => {
          if (res.status === 200) {
            console.log("success");
            alert("Success");
          } else {
            console.log(res.status);
            alert("Failed");
          }
        })
        .catch(err => console.log(err));
        e.preventDefault();
        }}>

        <label for="businessName">Business Name:</label>
        <input id="businessName" type="text" onChange={(e) => {setValues((current) => ({...current, "business_name": e.target.value}));}}/>

        <label for="user">User Name:</label>
        <input id="user" type="text" onChange={(e) => {setValues((current) => ({...current, "username": e.target.value}));}}/>

        <label for="email">Email Address:</label>
        <input id="email" type="text" onChange={(e) => {setValues((current) => ({...current, "email": e.target.value}));}}/>

        <label for="fname">First Name:</label>
        <input id="fname" type="text" onChange={(e) => {setValues((current) => ({...current, "first_name": e.target.value}));}}/>

        <label for="lname">Last Name:</label>
        <input id="lname" type="text" onChange={(e) => {setValues((current) => ({...current, "last_name": e.target.value}));}}/>

        <label for="industry">Industry: </label>
        <input id="industry" type="text" onChange={(e) => {setValues((current) => ({...current, "industry": null}));}}/>

        <label for="password">Password:</label>
        <input id="password" type="password" onChange={(e) => {setValues((current) => ({...current, "password": e.target.value}));}}/>

        <label for="address">Address:</label>
        <input id="address" type="text" onChange={(e) => {setValues((current) => ({...current, "address": e.target.value}));}}/>

        <label for="postalCode">Postal Code:</label>
        <input id="postalCode" type="text" onChange={(e) => {setValues((current) => ({...current, "zip_code": e.target.value}));}}/>

        <label for="city">City:</label>
        <input id="city" type="text" onChange={(e) => {setValues((current) => ({...current, "city": e.target.value}));}}/>

        <label for="description">Short description of your company:</label>
        <input id="description" type="text" onChange={(e) => {setValues((current) => ({...current, "short_paragraph": e.target.value}));}}/>

        <input type="submit" value="Sign Me Up!"/>
      </form>
    </div>
  </div>

}
