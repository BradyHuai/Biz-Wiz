import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 90,
    marginLeft: 220,
    marginBottom: 10,
    height: "100%",
    textAlign: "left",
  },
  table: {
    borderRadius: "0px 0px 0px 0px",
    width: "80%",
    display: "table",
    border: "1px solid",
    borderCollapse: "separate",
    lineHeight: "15px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
  },
  tableHead: {
    display: "table-header-group",
    verticalAlign: "middle",
    backgroundColor: "#f1c418",
  },
  title: {
    borderColor: "#7e7e7e #7e7e7e #7e7e7e #7e7e7e",
  },
  tableBody: {
    display: "table-row-group",
    verticalAlign: "middle",
    borderTop: "1px solid",
  },
  row: {
    textAlign: "left",
    verticalAlign: "top",
    display: "table-row",
  },
  cell1: {
    display: "table-cell",
    padding: "4px",
    lineHeight: "18px",
    borderTop: "1px solid #ddd",
    borderLeft: "1px solid #ddd",
    width: "25%",
  },
  cell2: {
    display: "table-cell",
    padding: "4px",
    lineHeight: "18px",
    borderTop: "1px solid #ddd",
    borderLeft: "1px solid #ddd",
    width: "75%",
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
    backgroundColor: "#f1c418",
  },
  button2: {
    margin: theme.spacing(1),
    float: "right",
    backgroundColor: "#eaeced",
  },
  buttons: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
  },
}));

export default function PostPage() {
  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = useState({
    position: "",
    title: "",
    location: "",
    salary: "",
    about: "",
    deadline: "",
    link: "",
    description: "",
    requirements: "",
    notes: "",
    company: "",
    website: "",
  });

  const id = history.location.state.id;
  const username = useSelector((state) => state.userinfo.username);

  useEffect(() => {
    (async () => {
      const posting_url = "http://localhost:8000/api/post";
      const post = await axios.get(posting_url, { params: { id: id } });

      setData({
        position: post.data.position,
        title: post.data.title,
        location: post.data.location,
        salary: post.data.salary,
        about: post.data.about,
        deadline: post.data.deadline,
        link: post.data.link,
        description: post.data.description,
        requirements: post.data.requirements,
        notes: post.data.notes,
        company: post.data.company,
        website: post.data.website,
      });
    })();
    // eslint-disable-next-line
  }, []);

  console.log(data);

  if (data === {}) {
    return <span>waiting... </span>;
  }

  // const routeChange = () => {
  //   let path = "/pages/edit-application";
  //   history.push(path);
  // };

  const handleSavePost = (event) => {
    const save_url = "http://localhost:8000/api/save_post";
    axios
      .post(save_url, { username: username, post_id: id })
      .then((res) => {
        if (res.status === 200) {
          console.log("success");
          alert("Posting saved!");
        } else {
          alert("Saving failed");
          console.log(res.status);
        }
      })
      .catch((e) => {
        alert("Internal Error...");
        console.log(e);
      });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr className={classes.title}>
            <th>JOB POSTING INFORMATION</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          <tr className={classes.row}>
            <th className={classes.cell1}>Position type:</th>
            <td className={classes.cell2}>{data.position}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Job Title:</th>
            <td className={classes.cell2}>{data.title}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Job Location:</th>
            <td className={classes.cell2}>{data.location}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Salary:</th>
            <td className={classes.cell2}>{data.salary}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>About company:</th>
            <td className={classes.cell2}>
              <p>{data.about}</p>
            </td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Job description:</th>
            <td className={classes.cell2}>
              <p>{data.description}</p>
            </td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Job Requirements:</th>
            <td className={classes.cell2}>
              <strong>Requirements:</strong>
              <br></br>
              {data.requirements}
            </td>
          </tr>
        </tbody>
      </table>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr className={classes.title}>
            <th>APPLICATION INFORMATION</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.row}>
            <th className={classes.cell1}>Application Deadline:</th>
            <td className={classes.cell2}>{data.deadline}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Application Website:</th>
            <td className={classes.cell2}>{data.website}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Additional Information:</th>
            <td className={classes.cell2}>{data.notes}</td>
          </tr>
        </tbody>
      </table>
      <table className={classes.table}>
        <thead className={classes.tableHead}>
          <tr className={classes.title}>
            <th>ORGANIZATION INFORMATION</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.row}>
            <th className={classes.cell1}>Organization:</th>
            <td className={classes.cell2}>{data.company}</td>
          </tr>
          <tr className={classes.row}>
            <th className={classes.cell1}>Website:</th>
            <td className={classes.cell2}>{data.website}</td>
          </tr>
        </tbody>
      </table>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          className={classes.button2}
          startIcon={<ExitToAppIcon />}
          onClick={history.goBack}
        >
          BACK
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          startIcon={<FavoriteIcon />}
          onClick={handleSavePost}
        >
          SAVE
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
          onClick={routeChange}
        >
          APPLY NOW
        </Button> */}
      </div>
    </div>
  );
}
