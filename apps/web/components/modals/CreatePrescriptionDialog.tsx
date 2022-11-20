import { IconButton, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LoadingIndicator from "components/ui/LoadingIndicator";
import { useMedicamenteQuery } from "generated/graphql";
import React, { Fragment, useEffect, useState } from "react";
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

const MedicamentDialog = ({
  open,
  handleClose,
  addMedicament,
  options,
  isAlreadyUsed,
}) => {
  const [medicament, setMedicament] = useState(null);
  const { handleSubmit, register, reset, getValues, setValue, errors } =
    useForm();

  useEffect(() => {
    setMedicament(null);
  }, [open]);

  const onSubmit = async ({ zile, cantitate, interval }) => {
    if (medicament) {
      addMedicament({ medicament, zile, cantitate, interval });
    }
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle onClose={handleClose}>Adauga medicament</DialogTitle>
        <Fragment>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent style={{ display: "flex", flexDirection: "column" }}>
              <Autocomplete
                options={options}
                getOptionDisabled={(option) => isAlreadyUsed(option) === true}
                value={medicament}
                onChange={(event, newValue) => {
                  setMedicament(newValue);
                }}
                getOptionLabel={(option) => option.name}
                autoComplete
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medicament"
                    variant="outlined"
                  />
                )}
              />
              <TextField
                name="zile"
                inputRef={register({ required: true })}
                label="Nr zile"
                margin="normal"
                variant="outlined"
                fullWidth
                type="number"
                error={errors.zile ? true : false}
              />
              <TextField
                name="cantitate"
                inputRef={register({ required: true })}
                label="Cantitate"
                margin="normal"
                variant="outlined"
                fullWidth
                type="number"
                error={errors.cantitate ? true : false}
              />
              <TextField
                name="interval"
                inputRef={register({ required: true })}
                label="La cate ore"
                margin="normal"
                variant="outlined"
                fullWidth
                type="number"
                error={errors.interval ? true : false}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Add medicament
              </Button>
            </DialogActions>
          </form>
        </Fragment>
      </Dialog>
    </div>
  );
};

const CreatePrescriptionDialog = ({
  open,
  handleClose,
  createPrescription,
}) => {
  const [addMedicamentOpen, setAddMedicamentOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([]);
  }, [open]);

  const handleSumbit = async () => {
    createPrescription(items);
  };

  const handleAddMedicament = (item) => {
    setItems([...items, item]);
    setAddMedicamentOpen(false);
  };

  const isAlreadyUsed = (item) => {
    const el = items.find((entry) => item.id === entry.medicament.id);
    if (el) {
      return true;
    }

    return false;
  };

  const { data } = useMedicamenteQuery();

  if (!data) {
    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <LoadingIndicator />
      </Dialog>
    );
  }

  const optiuniMedicamenete = data.medicamente;

  return (
    <Fragment>
      <MedicamentDialog
        isAlreadyUsed={isAlreadyUsed}
        options={optiuniMedicamenete}
        addMedicament={handleAddMedicament}
        open={addMedicamentOpen}
        handleClose={() => {
          setAddMedicamentOpen(false);
        }}
      />
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        open={open}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle onClose={handleClose}>Reteta</DialogTitle>
        <Fragment>
          <DialogContent style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item) => {
              return (
                <div key={item.medicament.id}>
                  <p>Medicament: {item.medicament.name}</p>
                  <p>Zile: {item.zile}</p>
                  <p>Cantitate: {item.cantitate}</p>
                  <p>Interval: {item.interval}</p>
                </div>
              );
            })}
            <Button
              onClick={() => {
                setAddMedicamentOpen(true);
              }}
              color="primary"
            >
              Adauga medicament
            </Button>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleSumbit}
              disabled={!items.length}
              color="primary"
            >
              Trimite reteta
            </Button>
          </DialogActions>
        </Fragment>
      </Dialog>
    </Fragment>
  );
};

export default CreatePrescriptionDialog;
