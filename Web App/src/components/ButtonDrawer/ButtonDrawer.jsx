import React from "react";
import {
    Drawer,
    Toolbar,
    makeStyles,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@material-ui/core";

import AssessmentIcon from "@material-ui/icons/Assessment";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import HistoryIcon from "@material-ui/icons/History";
import TimelineIcon from "@material-ui/icons/Timeline";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

export default function TemporaryDrawer(props) {
    const classes = useStyles();
    const [drawer, setDrawer] = React.useState(false);
    const list = () => (
        <div
            className={classes.drawerContainer}
            role="presentation"
            onClick={() => setDrawer(false)}
            onKeyDown={() => setDrawer(false)}
        >
            <List>
                <Toolbar />
                <ListItem button>
                    <ListItemIcon>
                        <AssessmentIcon />
                    </ListItemIcon>
                    <ListItemText>Generate Report</ListItemText>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <AssignmentTurnedInIcon />
                    </ListItemIcon>
                    <ListItemText>Discharge Patient</ListItemText>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText>View History</ListItemText>
                </ListItem>

                <ListItem button>
                    <ListItemIcon>
                        <TimelineIcon />
                    </ListItemIcon>
                    <ListItemText>Live Readings</ListItemText>
                </ListItem>
            </List>
        </div>
    );

    return (
        <List color="secondary">
            <ListItem button color="secondary">
                <ListItemIcon color="secondary"> 
                    <AssessmentIcon color="secondary"/>
                </ListItemIcon>
                <ListItemText color="secondary">Generate Report</ListItemText>
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText>Discharge Patient</ListItemText>
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <HistoryIcon />
                </ListItemIcon>
                <ListItemText>View History</ListItemText>
            </ListItem>

            <ListItem button>
                <ListItemIcon>
                    <TimelineIcon />
                </ListItemIcon>
                <ListItemText>Live Readings</ListItemText>
            </ListItem>
        </List>
    );
}
