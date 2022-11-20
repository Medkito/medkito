import Menu from "@material-ui/core/Menu";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    list: { padding: 15 },
    paper: {
      borderRadius: "10px 0px 10px 10px",
      border: "2px solid #D0DDEB",
      boxShadow: "0px 3px 20px #00000033",
    },
  })
);

const Popup = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles({});
  const children = React.Children.toArray(props.children);
  let { shouldCloseOnItemClick = true, horizontalPosition = "left" } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div
        className="inline-block"
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.menuButton}
      </div>
      <Menu
        classes={{ list: classes.list, paper: classes.paper }}
        elevation={8}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: horizontalPosition,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: horizontalPosition,
        }}
      >
        {children.map((child, index) => (
          <div
            onClick={shouldCloseOnItemClick ? handleClose : () => {}}
            key={index}
          >
            {child}
          </div>
        ))}
      </Menu>
    </Fragment>
  );
};

export default Popup;
