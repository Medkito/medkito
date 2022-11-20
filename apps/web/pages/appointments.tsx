import DashboardLayout from "components/ui/Layout/DashboardLayout/DashboardLayout";
import ProgramariList from "components/ui/ProgramariList";
import { useGetProgramariMedicQuery } from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React from "react";

const AppointmentsPage = () => {
  const { data } = useGetProgramariMedicQuery({ pollInterval: 1000 });

  if (!data) return null;

  const programari = data.getProgramariMedic;
  return (
    <DashboardLayout menuType="relative">
      <div style={{ padding: 50 }}>
        <ProgramariList programari={programari} />
      </div>
    </DashboardLayout>
  );
};

export default withAuth(AppointmentsPage);
