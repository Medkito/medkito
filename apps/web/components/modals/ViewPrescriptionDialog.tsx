import {
    IconButton,
    Typography
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import LoadingIndicator from "components/ui/LoadingIndicator";
import { useGetPrescriptionQuery } from "generated/graphql";
import React, { Fragment } from "react";
import PrescriptionPDFExport from "../PrescriptionPDFExport";


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



const ViewPrescriptionDialog = ({ handleClose, id }) => {
    const { data } = useGetPrescriptionQuery({ variables: { prescriptionId: id } });

    if (!data) {
        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                onClose={handleClose}
                open={id}
                aria-labelledby="form-dialog-title"
            >
                <LoadingIndicator />
            </Dialog>)
    }


    const items = data.getPrescription.items;
    const pacient = data.getPrescription.pacient;
    const medic = data.getPrescription.medic;


    return (
        <Fragment>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="sm"
                fullWidth
                onClose={handleClose}
                open={id}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle onClose={handleClose}>Reteta</DialogTitle>
                <Fragment>
                    <DialogContent style={{ display: "flex", flexDirection: "column" }}>
                        {items.map(item => {
                            return (
                                <div key={item.medicament.id}>
                                    <p>
                                        Medicament: {item.medicament.name}
                                    </p>
                                    <p>
                                        Zile: {item.zile}
                                    </p>
                                    <p>
                                        Cantitate: {item.cantitate}
                                    </p>
                                    <p>
                                        Interval: {item.interval} ore
                                    </p>
                                </div>
                            )
                        })}
                    </DialogContent>
                </Fragment>
                <PrescriptionPDFExport id={id} items={items} pacient={pacient} medic={medic} createdAt={data.getPrescription.createdAt} />

            </Dialog>
        </Fragment>
    );
};

export default ViewPrescriptionDialog;
