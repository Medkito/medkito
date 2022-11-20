import { Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Layout from "components/ui/Layout/Layout";
import { Field, Formik } from "formik";
import { LoginComponent } from "generated/graphql";
import { setAccessToken } from "lib/accessToken";
import withoutAuth from "lib/hocs/withoutAuth";
import { useAuth } from "lib/providers/Auth";
import React from "react";
import { InputField } from "../components/fields/InputField";

const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    border: "2px solid #d3d3d363",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
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

const LoginPage = ({ classes }) => {
  const { setAuthenticated } = useAuth();

  return (
    <Layout menuType="relative">
      <LoginComponent>
        {(login) => (
          <main className={classes.main}>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Intra in cont
              </Typography>
              <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (data, { setErrors }) => {
                  try {
                    const response = await login({
                      variables: data,
                    });

                    if (response && response.data) {
                      setAccessToken(response.data.login.accessToken);
                      setAuthenticated(true);
                      window.location.reload();
                    }
                  } catch (error) {
                    if (error.graphQLErrors[0].message) {
                      setErrors({
                        password: error.graphQLErrors[0].message,
                      });
                    }

                    return;
                  }
                }}
                initialValues={{
                  email: "",
                  password: "",
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className={classes.form}>
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
                    <Button
                      type="submit"
                      fullWidth
                      color="primary"
                      className={classes.submit}
                    >
                      Intra
                    </Button>
                  </form>
                )}
              </Formik>
            </Paper>
          </main>
        )}
      </LoginComponent>
    </Layout>
  );
};

//@ts-ignore
export default withStyles(styles)(withoutAuth(LoginPage));
