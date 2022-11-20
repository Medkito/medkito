import { useGetProgramMedicQuery } from "generated/graphql";
import React from "react";

const ProgramMedic = () => {
  const { data } = useGetProgramMedicQuery();
  if (!data) return null;
  const program = data.getProgramMedic;
  const { luni, marti, miercuri, joi, vineri } = program;
  const zile = { luni, marti, miercuri, joi, vineri };
  return (
    <div>
      <h1>Program medic:</h1>
      {Object.entries(zile).map(([key, { workingHours }]) => {
        return (
          <div key={key}>
            <b>{key}:</b> {workingHours.oraInceput} - {workingHours.oraSfarsit}
          </div>
        );
      })}
    </div>
  );
};

export default ProgramMedic;
