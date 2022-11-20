//@ts-nocheck
import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Field, Formik } from "formik";
import { setAccessToken } from "lib/accessToken";
import withoutAuth from "lib/hocs/withoutAuth";
import { useAuth } from "lib/providers/Auth";
import React, { useState } from "react";
import { InputField } from "../components/fields/InputField";
import { RegisterComponent, useSpecialtiesQuery } from "../generated/graphql";
import Layout from "./../components/ui/Layout/Layout";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    border: "2px solid #d3d3d363",
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
      3
    )}px`,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    color: "white",
    fontSize: 18,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
    textTransform: "capitalize",
    marginTop: theme.spacing(3),
  },
});

const RegisterPage = ({ classes }) => {
  const { setAuthenticated } = useAuth();
  const { data: dataSpecialties } = useSpecialtiesQuery({
    fetchPolicy: "network-only",
  });

  const [specialties, setSpecialties] = useState([]);
  const [specialtiesError, setSpecialtiesError] = useState(null);

  if (!dataSpecialties) {
    return null;
  }

  const specialtiesOptions = dataSpecialties.specialties;

  return (
    <Layout menuType="relative">
      <RegisterComponent>
        {(register) => (
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Cont medic nou
              </Typography>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (data, { setErrors }) => {
                  const { email, password, lastName, firstName } = data;

                  if (!specialties.length) {
                    setSpecialtiesError("alege specializari");
                    throw Error("need to select specialties");
                  }

                  try {
                    const response = await register({
                      variables: {
                        email,
                        password,
                        firstName,
                        lastName,
                        specialties: specialties.map((sp) =>
                          parseInt(sp.id, 10)
                        ),
                      },
                    });

                    if (response && response.data) {
                      setAccessToken(response.data.register.accessToken);
                      setAuthenticated(true);
                      window.location.reload();
                    }
                  } catch (err) {
                    const DEFAULT_ERRORS = {
                      email: "Email invalid",
                      firstName: "Prenume Invalid",
                      lastName: "Nume invalid",
                      password: "Parola invalida (min 5 caractere)",
                    };

                    const errors: { [key: string]: string } = {};
                    err.graphQLErrors[0].extensions.exception.validationErrors.forEach(
                      (validationErr: any) => {
                        Object.values(validationErr.constraints).forEach(
                          (message: any) => {
                            errors[validationErr.property] =
                              message === "already-taken" &&
                              validationErr.property === "email"
                                ? "Email deja folosit"
                                : DEFAULT_ERRORS[validationErr.property];
                          }
                        );
                      }
                    );
                    setErrors(errors);
                  }
                }}
                initialValues={{
                  email: "",
                  firstName: "",
                  lastName: "",
                  password: "",
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <Field
                      name="lastName"
                      label="Nume"
                      component={InputField}
                    />
                    <Field
                      name="firstName"
                      label="Prenume"
                      component={InputField}
                    />
                    <Field
                      name="email"
                      type="email"
                      label="Email"
                      component={InputField}
                    />
                    <Field
                      name="password"
                      label="Parola"
                      type="password"
                      component={InputField}
                    />
                    <Autocomplete
                      style={{ marginTop: 20 }}
                      multiple
                      options={specialtiesOptions}
                      value={specialties}
                      onChange={(event, newValue) => {
                        setSpecialties(newValue);
                      }}
                      filterSelectedOptions
                      getOptionLabel={(option) => option.denumire}
                      autoComplete
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={specialtiesError !== null}
                          helperText={specialtiesError}
                          label="Specializare"
                          variant="outlined"
                        />
                      )}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      color="primary"
                      className={classes.submit}
                    >
                      Creeaza cont
                    </Button>
                  </form>
                )}
              </Formik>
            </Paper>
          </main>
        )}
      </RegisterComponent>
    </Layout>
  );
};

//@ts-ignore
export default withStyles(styles)(withoutAuth(RegisterPage));
