import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, Collapse } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "100%",
    display: "table",
    border: "1px solid",
    borderCollapse: "separate",
    lineHeight: "15px",
  },
  tableHead: {
    display: "table-header-group",
    verticalAlign: "middle",
    backgroundColor: "#D9EDF7",
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
  cell: {
      display: "table-cell",
      padding: "4px",
      lineHeight: "18px",
      borderTop: "1px solid #ddd",
      borderLeft: "1px solid #ddd",
  },
}));

export default function PostPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <table className = {classes.table}>
          <thead className={classes.tableHead}>
              <tr className={classes.title}>
                  <th>JOB POSTING INFORMATION</th>
              </tr>
          </thead>
          <tbody className={classes.tableBody}>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">Position type:</td>
                  <td className={classes.cell} width="75%">Full-time</td>
              </tr>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">Job Title:</td>
                  <td className={classes.cell} width="75%">Full Stact Developer</td>
              </tr>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">Job Location:</td>
                  <td className={classes.cell} width="75%">123123 Street Toronto</td>
              </tr>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">Salary:</td>
                  <td className={classes.cell} width="75%">$50k annually</td>
              </tr>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">About company:</td>
                  <td className={classes.cell} width="75%">
                      <p>
                        Our company is a deep technology start-up dedicated to developing 
                        advanced sensing and control solutions for electrochemical system 
                        optimization. Our proprietary hardware and software are first-in-class, 
                        enabling users of electrochemical systems to gain previously inaccessible 
                        insights into their operations. 
                      </p>
                  </td>
              </tr>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">Job description:</td>
                  <td className={classes.cell} width="75%">
                      <p>
                        We are looking for a skilled, curious, and driven full stack developer to lead the development 
                        of our front-end web architecture and to ensure the responsiveness of our applications as we 
                        grow and bring our technologies to market. 
                      </p>
                  </td>
              </tr>
              <tr className={classes.row}>
                  <td className={classes.cell} width="25%">Job Requirements:</td>
                  <td className={classes.cell} width="75%">
                      <strong>Requirements:</strong>
                      <ul>
                          <li>A B.S./B.A., M.Sc., or PhD in computer science, math, engineering, or related field (min GPA 3.5/4)</li>
                          <li> Proficiency in one or more general purpose programming languages including (but not limited to) Java, C/C++, C#, Objective C, Python, JavaScript, or Go</li>
                          <li> Familiarity with SQL and NoSQL databases</li>
                      </ul>
                      <strong>Bonus:</strong>
                      <ul>
                          <li>Knowledge and understanding of embedded systems programming and/or systems modelling</li>
                          <li>Experience developing and deploying statistical models and AI pipelines</li>
                          <li>Knowledge and understanding of control theory </li>
                      </ul>
                  </td>
              </tr>
          </tbody>
      </table>
      <table className = {classes.table}>
            <thead className={classes.tableHead}>
              <tr className={classes.title}>
                    <th>APPLICATION INFORMATION</th>
              </tr>
            </thead>
      </table>
      <table className = {classes.table}>
            <thead className={classes.tableHead}>
              <tr className={classes.title}>
                    <th>ORGANIZATION INFORMATION</th>
              </tr>
            </thead>
      </table>
    </div>
  );
}
