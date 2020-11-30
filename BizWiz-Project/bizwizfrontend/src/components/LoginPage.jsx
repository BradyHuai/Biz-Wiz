import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";
import { updateInfo } from "../redux/ducks/userinfo";
import { useDispatch } from "react-redux";


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

export default function LoginPage() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [verify, setVerify] = useState(false);

  const handleSignIn = (e) => {
    const url = "http://localhost:8000/api/accounts/login/";
    let x = false;
    
      // (async () => {
      //   const result = await axios({
      //     method: "post",
      //     url: url,
      //     data: values,
      //   })
      //   .then((res) => {
      //       if (res.status !== 200) {
      //         alert("Invalid username or password.");
      //         console.log(res.status);
      //         return;
      //       }
      //     })
      //   .catch((e) => {
      //       alert("Invalid input, please check your inputs.");
      //       console.log(e);
      //   });
        
      //   dispatch(updateInfo(values.username));
      //   history.push("/pages/profilepage");
      // })();

      // (async () => {
      //   const result = await axios({
      //     method: "post",
      //     url: url,
      //     data: values,
      //   })
      //   .then((res) => {
      //       if (res.status === 200) {
      //         x = true;
      //         setVerify(true);
      //         dispatch(updateInfo(values.username));
      //       }
      //       else {
      //         alert("Invalid username or password.");
      //         console.log(res.status);
      //         x = false;
      //       }
      //     })
      //   .catch((e) => {
      //       alert("Invalid input, please check your inputs.");
      //       console.log(e);
      //   });
      //   console.log(result);
      //   if (x){
      //     history.push("/pages/profilepage");
      //   }
      //   // if (verify){
      //   //   history.push("/pages/profilepage");
      //   // }
      // })();

      (async () => {
        const result = await axios({
          method: "post",
          url: url,
          data: values,
        })
        console.log(result);

        if (result.status !== 200){
          alert("Invalid username or password.");
          console.log(result.status);
          return;
        }
        
        dispatch(updateInfo(values.username));
        history.push("/pages/profilepage");
      })();
  };

  const handleSignUp = () => {
    history.push("/sign-up");
  };

  const handleChangeForm = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={handleChangeForm("username")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangeForm("password")}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSignIn}
              className={classes.submit}
              style={{
                background: "linear-gradient(45deg, #2979ff 30%, #2196f3 90%)",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={handleSignUp}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
