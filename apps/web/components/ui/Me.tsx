import { useQuery } from "@apollo/client";
import QueryResult from "components/containers/QueryResult";
import { MeDocument } from "generated/graphql";
import React from "react";

const Me = () => {
  const { ...queryResult } = useQuery(MeDocument);

  return (
    <>
      <QueryResult {...queryResult}>
        {({
          data: {
            me: { email, id, specialties },
          },
        }) => (
          <div>
            <p>Id: {id}</p>
            <p>email: {email}</p>
            <p>Specializari:</p>
            {specialties.length == 0 && <p>no specialties selected</p>}
            {specialties.map((sp) => {
              return <p>{sp.denumire}</p>;
            })}
          </div>
        )}
      </QueryResult>
    </>
  );
};

export default Me;
