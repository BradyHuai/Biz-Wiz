import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: "#bbdefb",
    },
}));

export default function Profiles() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Typography variant="h6" gutterBottom>
                    User Profile
                </Typography>
                <AccountCircleIcon style={{ fontSize: 100 }} />
            </div>
        </React.Fragment>
    );
}
