import { Paper } from "@material-ui/core";
import ProgramMedic from "components/ProgramMedic";
import AccountEdit from "components/ui/AccountEdit";
import DashboardLayout from "components/ui/Layout/DashboardLayout/DashboardLayout";
import { useMeQuery } from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import * as React from "react";

const AccountSettings = () => {
  const { data } = useMeQuery();

  return (
    <DashboardLayout title="Account Settings">
      {data && (
        <div style={{ padding: 30 }}>
          <Paper style={{ padding: 30, marginBottom: 40 }}>
            <h1>Cont</h1>
            <AccountEdit info={data.me} />
          </Paper>

          <Paper style={{ padding: 30 }}>
            <ProgramMedic />
          </Paper>
        </div>
      )}
    </DashboardLayout>
  );
};

export default withAuth(AccountSettings);
