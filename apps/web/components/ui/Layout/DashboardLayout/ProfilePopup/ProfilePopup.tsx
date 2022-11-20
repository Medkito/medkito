import { Avatar, Icon, MenuItem, Tooltip, withStyles } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Popup from "components/ui/Menu/Popup";
import { logout as authLogout } from "lib/auth";
import Router from "next/router";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    topbar: {
      "& .topbar-hold": {
        backgroundColor: theme.palette.primary.main,
        height: "80px",
        "&.fixed": {
          boxShadow: theme.shadows[1],
          height: "80px",
        },
      },
    },
    menuItem: {
      marginBottom: 3,
      display: "flex",
      alignItems: "center",
      padding: "10px 10px",
      borderRadius: 10,
      "&:hover": {
        background: "#F3F6FF",
        border: "2px solid #DEE3F2",
      },
      border: "2px solid white",
    },
    icon: {
      color: "#92A3C4",
      marginRight: 5,
    },
    popupContainer: {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    nameText: {
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 10,
    },
  })
);

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "black",
    color: "white",
    padding: "10px 20px",
    fontWeight: "normal",
    borderRadius: "10px 0px 10px 10px",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

export default function ProfilePopup({ name, avatar }) {
  const classes = useStyles({});

  const handleSignOut = () => {
    authLogout();
  };

  return (
    <Popup
      menuButton={
        <div className={classes.popupContainer}>
          <LightTooltip title={name} placement="bottom-start">
            <Fragment>
              {!avatar && (
                <Avatar
                  style={{
                    backgroundColor: "red",
                  }}
                >
                  {name[0]}
                </Avatar>
              )}
              {avatar && <Avatar src={avatar} />}
            </Fragment>
          </LightTooltip>

          {/* <p className={classes.nameText}>{name}</p> */}
        </div>
      }
    >
      <MenuItem
        className={classes.menuItem}
        onClick={() => {
          Router.push("/account-settings");
        }}
      >
        <Icon className={classes.icon}> account_circle </Icon>
        <span className="pl-4"> Cont </span>
      </MenuItem>
      <MenuItem onClick={handleSignOut} className={classes.menuItem}>
        <Icon className={classes.icon}> power_settings_new </Icon>
        <span className="pl-4"> Delogare </span>
      </MenuItem>
    </Popup>
  );
}
