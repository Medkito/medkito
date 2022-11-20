import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { logout } from "../../../lib/auth";

const styles = {
  drawerPaper: {
    width: "100%",
    height: "100vh",
    background: "white",
  },
};

const ResponsiveDrawer = ({ classes, open = false, onClose, isAuth }) => {
  const isAuthLinks = [
    {
      name: "Cont",
      route: "/account-settings",
    },
    {
      name: "Delogare",
      action: logout,
    },
  ];

  const defaultLinks = [
    {
      name: "Intra in cont",
      route: "/login",
    },
    {
      name: "Inregistreaza-te",
      route: "/register",
    },
  ];

  const links = isAuth ? isAuthLinks : defaultLinks;

  return (
    <>
      <Drawer
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
        onClick={onClose}
      >
        <List>
          {links.map((link) => (
            <ListItem
              onClick={() => {
                if (link.action) {
                  link.action();
                } else {
                  window.location.pathname = link.route;
                }
              }}
              button
              key={link.name}
            >
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};
//@ts-ignore
export default withStyles(styles)(ResponsiveDrawer);
