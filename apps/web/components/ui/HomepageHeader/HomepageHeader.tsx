import Grid from "@material-ui/core/Grid";
import { useIsAuthenticated } from "lib/providers/Auth";
import Router from "next/router";
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  ${({ theme }) => `
    font-weight: 500;
    color: white;
    background: ${theme.palette.primary.main};
    border: none;
    border-radius: 3px;
    cursor: pointer;
 `}
`;

const HeaderContent = styled.div`
  padding-top: 100px;
`;

const Container = styled.div`
  padding: 20px;
  margin-top: 20px;
  h1 {
    margin-bottom: 20px;
    font-weight: 400;
  }
  h4 {
    margin: 5px 0px;
    font-weight: 200;
  }
  .input {
    padding-top: 30px !important;
    margin-right: 20px !important;
    padding-bottom: 20px !important;
  }
  .apple {
    cursor: pointer;
    width: 195px;
    margin-right: 10px;
    @media only screen and (max-width: 1000px) {
      width: 120px;
    }
  }
  .google {
    cursor: pointer;
    width: 195px;
    @media only screen and (max-width: 1000px) {
      width: 120px;
    }
  }
  .ipad-container {
    height: 600px;
    @media only screen and (max-width: 477px) {
      height: 300px;
    }
  }

  .ipad-top {
    width: 35rem;
    height: auto;
    position: absolute;
    right: 0;

    @media only screen and (max-width: 477px) {
      width: 20rem;
      height: auto;
    }
  }
  .header-button {
    padding: 10px 14px;
    margin-right: 15px;
    @media only screen and (max-width: 477px) {
      margin-bottom: 15px;
    }
  }
`;

const HomepageHeader = () => {
  const isAuth = useIsAuthenticated();

  return (
    <Container>
      <Grid container direction="row">
        <Grid item lg={2} md={1} sm={1} />
        <Grid item lg={5} md={6} sm={11} xs={12}>
          <HeaderContent>
            <h1>Medkito</h1>
            <h4>Platforma pentru gestiunea cabinetelor medicale</h4>

            <div style={{ marginTop: "30px" }}>
              {!isAuth && (
                <Button
                  onClick={() => {
                    Router.push("/register");
                  }}
                  className="header-button"
                >
                  Alature-te ca medic
                </Button>
              )}

              {isAuth && (
                <Button
                  onClick={() => {
                    Router.push("/dashboard");
                  }}
                  className="header-button"
                >
                  Go to dashboard
                </Button>
              )}
            </div>
            <br />
          </HeaderContent>
        </Grid>
      </Grid>
    </Container>
  );
};
export default HomepageHeader;
