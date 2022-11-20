import { Avatar, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import dayjs from "dayjs";
import React from "react";

const useStyles = makeStyles({
    container: {
        maxHeight: 440,
    }
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#0B0D12",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(
    id, startDate, endDate, pacient
) {
    return {
        id, startDate, endDate, pacient
    };
}

interface ProgramariListProps {
    programari: any;
    isToday?: boolean;
}

const ProgramariList = ({ programari, isToday = false }: ProgramariListProps) => {
    const classes = useStyles();

    const data = programari.map(
        ({ id, startDate, endDate, pacient }) => {
            return createData(
                id, startDate, endDate, pacient
            );
        }
    );

    return (
        <TableContainer component={Paper} elevation={0} className={classes.container}>
            <Table stickyHeader size="small" aria-label="a dense table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell>Avatar</StyledTableCell>
                        <StyledTableCell>Nume Pacient</StyledTableCell>
                        <StyledTableCell>{isToday ? "Ora" : "Data"}</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell>
                                <Avatar src={row.pacient.avatarUrl}></Avatar>
                            </StyledTableCell>
                            <StyledTableCell>{row.pacient.name}</StyledTableCell>
                            <StyledTableCell>{isToday ? dayjs(row.startDate).format("HH:mm") : dayjs(row.startDate).format("DD.MM.YYYY HH:mm")}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProgramariList
