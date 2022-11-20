import { IconButton, makeStyles, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    borderBottom: "1px solid #DEE3F2",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  content: {
    padding: 0,
  },
}));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles({});

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

const ConversationDialog = ({ conversation, handleClose }) => {
  const fieldRef = React.useRef<HTMLInputElement>(null);
  const classes = useStyles({});

  return (
    <Dialog
      fullWidth
      open={true}
      onClose={handleClose}
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle onClose={handleClose}>
        {conversation.name ? conversation.name : conversation.id}
      </DialogTitle>

      <DialogContent dividers className={classes.content}></DialogContent>
    </Dialog>
  );
};

export default ConversationDialog;
