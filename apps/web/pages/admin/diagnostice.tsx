import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Layout from "components/ui/Layout/Layout";
import {
  useAddDiagnosticMutation,
  useDiagnosticeQuery,
  useGetSymptomsQuery,
  useSpecialtiesQuery,
} from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SpecializariPage = () => {
  const { data, refetch } = useDiagnosticeQuery({
    fetchPolicy: "network-only",
  });
  const { data: dataSpecialties } = useSpecialtiesQuery({
    fetchPolicy: "network-only",
  });
  const { data: symptomsData } = useGetSymptomsQuery({
    fetchPolicy: "network-only",
  });

  const { register, handleSubmit, errors, reset } = useForm();

  const [createDiagnostic] = useAddDiagnosticMutation();

  const [specialty, setSpecialty] = useState(null);
  const [symptoms, setSymptoms] = useState([]);

  const onSubmit = async ({ name }) => {
    try {
      if (!specialty) {
        throw Error("need to select specialty");
      }

      if (!symptoms.length) {
        throw Error("need to select symptoms");
      }

      await createDiagnostic({
        variables: {
          name,
          specialtyId: parseInt(specialty.id, 10),
          symptomsIds: symptoms.map((el) => parseInt(el.id, 10)),
        },
      });

      setSpecialty(null);
      setSymptoms([]);
      reset();
      refetch();
    } catch (error) {
      console.log("error add specialty", error);
    }
  };

  if (!data || !dataSpecialties || !symptomsData) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  const specializari = dataSpecialties.specialties;
  const symptomsOptions = symptomsData.symptoms;

  return (
    <Layout menuType="relative">
      <div>
        <h1>Diagnostice</h1>
        <div>Nr diagnostice: {data.diagnostice.length}</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
              name="name"
              inputRef={register({ required: true })}
              label="Denumire diagnostic"
              margin="normal"
              variant="outlined"
              fullWidth
              error={errors.name ? true : false}
            />
            <Autocomplete
              style={{ marginTop: 20 }}
              options={specializari}
              value={specialty}
              onChange={(event, newValue) => {
                setSpecialty(newValue);
              }}
              getOptionLabel={(option) => option.denumire}
              autoComplete
              disableClearable
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Specializare"
                  variant="outlined"
                />
              )}
            />

            <Autocomplete
              style={{ marginTop: 20 }}
              multiple
              id="tags-outlined"
              options={symptomsOptions}
              value={symptoms}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              onChange={(event, newValue) => {
                setSymptoms(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Simptome"
                  placeholder="Alege simptom"
                />
              )}
            />
          </div>
          <Button type="submit" color="primary">
            Adauga diagnostic
          </Button>
        </form>

        <ul>
          {data.diagnostice
            .filter((x) => x.specialty !== null)
            .map((x) => {
              return (
                <div
                  style={{ border: "1px solid grey", marginBottom: 20 }}
                  key={x.id}
                >
                  <h5>{x.name}</h5>
                  <div>
                    Specializare: {x.specialty ? x.specialty.denumire : "-"}
                  </div>
                  <div>
                    Simptome:{" "}
                    {x.symptoms && x.symptoms.length
                      ? x.symptoms.map((el) => el.name).join(", ")
                      : "-"}
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
    </Layout>
  );
};

export default withAuth(SpecializariPage);
