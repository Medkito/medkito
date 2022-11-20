import {
  FormControl,
  FormLabel,
  IconButton,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  pageCard: {
    margin: 10,
    cursor: "pointer",
    "&:hover": {
      background: "grey",
    },
  },
  title: {
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const DialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  const classes = useStyles({});

  return (
    <MuiDialogTitle disableTypography {...other}>
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

const CloseChatDialog = ({ open, handleClose, closeChat }) => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = async ({ name }) => {
    closeChat(name);
  };

  return (
    <div>
      <Dialog
        fullWidth
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle onClose={handleClose}>Incheie conversatia</DialogTitle>
        <Fragment>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Informatii conversatie</FormLabel>
              </FormControl>

              <TextField
                name="name"
                inputRef={register({ required: true })}
                label="Rezumat"
                margin="normal"
                variant="outlined"
                fullWidth
                error={errors.name ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Incheie conversatia
              </Button>
            </DialogActions>
          </form>
        </Fragment>
      </Dialog>
    </div>
  );
};

export default CloseChatDialog;
