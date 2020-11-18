import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
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
    width: "80%",
    display: "table",
    border: "1px solid",
    borderCollapse: "separate",
    lineHeight: "15px",
    margin: "20px",
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
                  <th className={classes.cell1}>Position type:</th>
                  <td className={classes.cell2}>Full-time</td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>Job Title:</th>
                  <td className={classes.cell2}>Full Stack Developer</td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>Job Location:</th>
                  <td className={classes.cell2}>123123 Street Toronto</td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>Salary:</th>
                  <td className={classes.cell2}>$50k annually</td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>About company:</th>
                  <td className={classes.cell2}>
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
                  <th className={classes.cell1}>Job description:</th>
                  <td className={classes.cell2}>
                      <p>
                        We are looking for a skilled, curious, and driven full stack developer to lead the development 
                        of our front-end web architecture and to ensure the responsiveness of our applications as we 
                        grow and bring our technologies to market. 
                      </p>
                  </td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>Job Requirements:</th>
                  <td className={classes.cell2}>
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
            <tbody>
                <tr className={classes.row}>
                    <th className={classes.cell1}>Application Deadline:</th>
                    <td className={classes.cell2}></td>
                </tr>
                <tr className={classes.row}>
                  <th className={classes.cell1}>Application Website:</th>
                  <td className={classes.cell2}></td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>Additional Information:</th>
                  <td className={classes.cell2}></td>
              </tr>
            </tbody>
      </table>
      <table className = {classes.table}>
            <thead className={classes.tableHead}>
              <tr className={classes.title}>
                    <th>ORGANIZATION INFORMATION</th>
              </tr>
            </thead>
            <tbody>
            <tr className={classes.row}>
                  <th className={classes.cell1}>Organization:</th>
                  <td className={classes.cell2}>Google</td>
              </tr>
              <tr className={classes.row}>
                  <th className={classes.cell1}>Website:</th>
                  <td className={classes.cell2}><a href="url">google.com</a></td>
              </tr>
            </tbody>
      </table>
    </div>
  );
}
