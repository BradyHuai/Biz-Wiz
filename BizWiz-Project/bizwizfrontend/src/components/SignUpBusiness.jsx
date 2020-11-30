import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import "./SignUp.css";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  title: {
    height: "100px",
    width: "70%",
    backgroundColor: "#f1c418",
    margin: "auto",
    textAlign: "middle",
    verticalAlign: "middle",
    lineHeight: "100px",
    color: "white",
    borderRadius: "25px",
    marginTop: "100px",
    fontSize: "200%",
  },

  signUp: {
    height: "100%",
    width: "70%",
    backgroundColor: "#eaeaea",
    margin: "auto",
    color: "black",
    marginTop: "25px",
  },

  label: {
    paddingRight: "50%",
    float: "left",
    paddingLeft: "5%",
    fontSize: "1.75em",
  },

  input: {
    width: "90%",
    padding: "12px 20px",
    margin: "auto",
    display: "block",
    border: "none",
    borderWidth: "0px",
    borderRadius: "40px",
    boxSizing: "border-box",
    fontSize: "large",
  },

  submitSignup: {
    width: "25%",
    backgroundColor: "#f1c418",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    fontSize: "large",
  },
}));

export default function SignUpPage() {
  const classes = useStyles();
  const history = useHistory();
  const handleSignIn = () => {
    history.push("/login");
  };

  const [values, setValues] = useState({
    business_name: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    industry: null,
    password: "",
    address: "",
    zip_code: "",
    city: "",
    short_paragraph: "",
  });

  //data states
  const [options, updateOptionData] = React.useState({
    cities: [],
    industries: [],
  });

  //get the option information regarding the different industries
  React.useEffect(() => {
    (async () => {
      const get_url = "http://localhost:8000/api/options"; //TODO ask backend peeps for request url for different industries and cities
      const response = await axios({
        method: "get",
        url: get_url,
      });

      updateOptionData({
        cities: response.data.cities,
        types: response.data.types,
      });
    })();
  }, []);

  return (
    <div className="container">
      <div className={classes.title}>Biz-Wiz Account Registration</div>

      <div className={classes.signUp}>
        <h1 className={classes.label} style={{ paddingBottom: "1%" }}>
          Business Account
        </h1>

        <form
          style={{ padding: "10px" }}
          onSubmit={(e) => {
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
              .catch((err) => console.log(err));
            e.preventDefault();
          }}
        >
          <label className={classes.label} for="businessName">
            Business Name:
          </label>
          <input
            className={classes.input}
            id="businessName"
            type="text"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                business_name: e.target.value,
              }));
            }}
          />

          <label className={classes.label} for="user">
            User Name:
          </label>
          <input
            className={classes.input}
            id="user"
            type="text"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                username: e.target.value,
              }));
            }}
          />

          <label className={classes.label} for="email">
            Email Address:
          </label>
          <input
            className={classes.input}
            id="email"
            type="text"
            onChange={(e) => {
              setValues((current) => ({ ...current, email: e.target.value }));
            }}
          />

          <label className={classes.label} for="fname">
            First Name:
          </label>
          <input
            className={classes.input}
            id="fname"
            type="text"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                first_name: e.target.value,
              }));
            }}
          />

          <label className={classes.label} for="lname">
            Last Name:
          </label>
          <input
            className={classes.input}
            id="lname"
            type="text"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                last_name: e.target.value,
              }));
            }}
          />

          <label className={classes.label} for="industry">
            Industry:{" "}
          </label>
          <select
            className={classes.input}
            id="industry"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                industry: e.target.value,
              }));
            }}
          >
            <option value="" disabled selected>
              Select an Industry
            </option>
            <option value="IT">IT</option>
            {getEntries(options.industries)}
          </select>

          <label className={classes.label} for="password">
            Password:
          </label>
          <input
            className={classes.input}
            id="password"
            type="password"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                password: e.target.value,
              }));
            }}
          />

          <label className={classes.label} for="address">
            Address:
          </label>
          <input
            className={classes.input}
            id="address"
            type="text"
            onChange={(e) => {
              setValues((current) => ({ ...current, address: e.target.value }));
            }}
          />

          <label className={classes.label} for="postalCode">
            Postal Code:
          </label>
          <input
            className={classes.input}
            id="postalCode"
            type="text"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                zip_code: e.target.value,
              }));
            }}
          />

          <label className={classes.label} for="city">
            City:
          </label>
          <select
            className={classes.input}
            id="city"
            onChange={(e) => {
              setValues((current) => ({ ...current, city: e.target.value }));
            }}
          >
            <option value="" disabled selected>
              Select a City
            </option>
            <option value="IT">Toronto</option>
            {getEntries(options.cities)}
          </select>

          <label className={classes.label} for="description">
            Short description of your company:
          </label>
          <textarea
            className={classes.input}
            id="description"
            maxLength="400"
            rows="4"
            cols="50"
            onChange={(e) => {
              setValues((current) => ({
                ...current,
                short_paragraph: e.target.value,
              }));
            }}
          />

          <input
            className={classes.submitSignup}
            type="submit"
            value="Sign Me Up!"
          />
        </form>
      </div>
    </div>
  );
}

//return jsx html with options for dropdown regarding industries
function getEntries(typeData) {
  const options = [];
  for (let i = 0; i < typeData.length; i++) {
    options.push(
      <option key={"type" + i} value={typeData[i]}>
        {typeData[i]}
      </option>
    );
  }
  return options;
}
