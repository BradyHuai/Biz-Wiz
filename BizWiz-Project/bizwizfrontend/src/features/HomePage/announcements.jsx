import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
    },
}));


export default function Announcements() {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
            <Typography variant="h6" gutterBottom>
                Biz-wiz News
            </Typography>
            <List component="nav" aria-label="main news list">
                    <ListItem
                    button
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    >
                    <ListItemText primary="Covid-19 Update" />
                    </ListItem>

                <Divider />

                    <ListItem
                    button
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                    >
                    <ListItemText primary="Who is hiring in Canada?" />
                    </ListItem>
                
                <Divider />

                    <ListItem
                    button
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    >
                    <ListItemText primary="The post-pandemic skills you will need" />
                    </ListItem>
                <Divider />
                    <ListItem
                    button
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    >
                    <ListItemText primary="New start-ups in Toronto" />
                    </ListItem>
                <Divider />
                    <ListItem
                    button
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                    >
                    <ListItemText primary="Canada increases immagration targets" />
                    </ListItem>
                </List>
            </div>
        </React.Fragment>
    );
}
