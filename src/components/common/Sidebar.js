import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

import SideListItem from './SideListItem';
import Rutas from '../router/Rutas';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    appBar: {
        background: "#28B463", //color de barra superior / header
        zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        background: "#F2F3F4", //color de sidebar / menu
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    }
}));

function ResponsiveDrawer(props) {
    const { container } = props;
    const classes = useStyles();

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <SideListItem />
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        MESA DE INVESTIGACIÓN DE CRÉDITO Y COBRANZA
                    </Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE}>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer container={container} variant="permanent" classes={{paper: classes.drawerPaper}} >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer classes={{paper: classes.drawerPaper}} variant="permanent" open >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>

                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Rutas />
                </main>
            </BrowserRouter>
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    container: PropTypes.instanceOf(
        typeof Element === "undefined" ? Object : Element
    )
};

export default ResponsiveDrawer;