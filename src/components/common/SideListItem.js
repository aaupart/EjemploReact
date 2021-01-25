import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from '@material-ui/icons/Apps';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles((theme) => ({
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function SideListItem() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List>
            <ListItem button component={Link} to={"/"}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Inicio" style={{ color: "black" }} />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <AppsIcon />
                </ListItemIcon>
                <ListItemText primary="Reportes" style={{ color: "black" }} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open}>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/Outbound"} >
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Outbound" style={{ color: "black" }} />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/Dictaminacion1"}>
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dictaminación 1" style={{ color: "black" }} />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/Dictaminacion3"}>
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dictaminación 3" style={{ color: "black" }} />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/ClientesVerdes"}>
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clientes Verdes" style={{ color: "black" }} />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/CitasJP"}>
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Confirmación Citas" style={{ color: "black" }} />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/Reestructura"}>
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reestructura" style={{ color: "black" }} />
                    </ListItem>
                    <ListItem button className={classes.nested} component={Link} to={"/Reportes/EmpresarioAzteca"}>
                        <ListItemIcon>
                            <ChromeReaderModeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Empresario Azteca" style={{ color: "black" }} />
                    </ListItem>
                </List>
            </Collapse>
            <Divider />
            <ListItem button component={Link} to={"/InformacionFolios"}>
                <ListItemIcon>
                    <PageviewIcon />
                </ListItemIcon>
                <ListItemText primary="Información Folios" style={{ color: "black" }} />
            </ListItem>
            <Divider />
        </List>
    );
}