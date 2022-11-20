import {
  Avatar,
  createStyles,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import DashboardLayout from "components/ui/Layout/DashboardLayout/DashboardLayout";
import ProgramariList from "components/ui/ProgramariList";
import {
  useGetProgramariMedicForTodayQuery,
  useMedicMainStatsQuery,
  useMeQuery,
} from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  border-radius: 5px;
  margin-bottom: 30px;
  padding: 30px;
  background: white;
  border: 1px solid #e5e6ea;
`;

const useStyles = makeStyles((theme) =>
  createStyles({
    pageHeader: {
      height: "50px",
      display: "flex",
      alignItems: "center",
    },
    pageTitle: {
      color: "black",
      fontWeight: 500,
      fontSize: 24,
    },
    page: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    avatar: { width: 45, height: 45 },
    submit: {
      backgroundColor: "#0063cc",
      borderColor: "#0063cc",
      fontWeight: 300,
      fontSize: 16,
      "&:hover": {
        backgroundColor: "#0063cc",
        borderColor: "#0063cc",
      },
      textTransform: "capitalize",
      marginTop: theme.spacing(3),
    },
  })
);

const DashboardCard = ({ text = "Text1", secondaryText = "Text2", avatar }) => {
  const classes = useStyles({});

  return (
    <Card style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar className={classes.avatar} src={avatar} alt="avatar" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          marginLeft: 30,
        }}
      >
        <div style={{ fontSize: 20, fontWeight: "bold" }}>{text}</div>
        <div style={{ fontSize: 14 }}>{secondaryText}</div>
      </div>
    </Card>
  );
};

const ProgramariToday = () => {
  const classes = useStyles({});

  const { data } = useGetProgramariMedicForTodayQuery({
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  if (!data) {
    return null;
  }

  const programari = data.getProgramariMedicForToday;
  const hasAppointments = programari.length > 0;

  return (
    <Card style={{ flexDirection: "column" }}>
      <Typography variant="h5" className={classes.pageTitle}>
        Programari pentru astazi
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          marginTop: 30,
        }}
      >
        {!hasAppointments && <h4>Nu aveti programari</h4>}
        {hasAppointments && (
          <ProgramariList isToday={true} programari={programari} />
        )}
      </div>
    </Card>
  );
};

const DashboardPage = () => {
  const { data } = useMeQuery({ ssr: false });
  const { data: statsData } = useMedicMainStatsQuery({
    fetchPolicy: "network-only",
    pollInterval: 5000,
  });

  const classes = useStyles({});

  if (!data || !statsData) {
    return (
      <DashboardLayout menuType="relative">
        <div>loading...</div>
      </DashboardLayout>
    );
  }

  const { id, email, name, avatarUrl } = data.me;

  const { intrebariActive, cazuriRezolvate, consultatiiTotale } =
    statsData.medicMainStats;

  return (
    <DashboardLayout menuType="relative">
      <div className={classes.page} style={{ padding: 30, paddingTop: 0 }}>
        <div
          className={classes.pageHeader}
          style={{ marginTop: 40, marginBottom: 20 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {avatarUrl && (
              <Avatar
                style={{ marginRight: 20, height: 55, width: 55 }}
                src={avatarUrl}
              />
            )}
            {!avatarUrl && (
              <Avatar
                style={{
                  backgroundColor: "red",
                  marginRight: 20,
                  height: 55,
                  width: 55,
                }}
              >
                {name.split(" ")[0][0]}
              </Avatar>
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={classes.pageTitle}>{name.split(" ")[0]}</span>
              <span style={{ fontSize: 17 }}>Statisticile dumneavoastra</span>
            </div>
          </div>
        </div>
        <Grid
          container
          spacing={3}
          justifyContent={"space-between"}
          style={{ marginBottom: 20 }}
        >
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <DashboardCard
              text={intrebariActive.toString()}
              secondaryText="Intrebari active"
              avatar="./dashboard/dash1.png"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <DashboardCard
              text={cazuriRezolvate.toString()}
              secondaryText="Pacienti ajutati"
              avatar="./dashboard/dash2.png"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4}>
            <DashboardCard
              text={consultatiiTotale.toString()}
              secondaryText="Consultatii totale"
              avatar="./dashboard/dash3.png"
            />
          </Grid>
        </Grid>

        <ProgramariToday />
      </div>
    </DashboardLayout>
  );
};

export default withAuth(DashboardPage);
