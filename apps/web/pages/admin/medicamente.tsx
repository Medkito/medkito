import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Layout from "components/ui/Layout/Layout";
import { useAddMedicamentMutation, useMedicamenteQuery } from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React from "react";
import { useForm } from "react-hook-form";


const MedicamentePage = () => {
    const { data, refetch } = useMedicamenteQuery({ fetchPolicy: "network-only" });

    const { register, handleSubmit, errors, reset } = useForm();


    const [createMedicament] = useAddMedicamentMutation()

    const onSubmit = async ({ name }) => {
        try {
            await createMedicament({
                variables: {
                    name
                }
            })

            reset()
            refetch()
        } catch (error) {
            console.log("error add medicament", error)
        }
    };

    if (!data) {
        return (
            <Layout>
                <div>loading...</div>
            </Layout>
        );
    }

    return (
        <Layout menuType="relative">
            <div>
                <h1>Medicamente</h1>
                <div>Nr medicamente: {data.medicamente.length}</div>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            name="name"
                            inputRef={register({ required: true })}
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={errors.name ? true : false}
                        />
                    </div>
                    <Button type="submit" color="primary">
                        Adauga medicament
                    </Button>
                </form>

                <ul>
                    {data.medicamente.map((x) => {
                        return (
                            <li key={x.id}>
                                {x.name}
                            </li>
                        );
                    })}
                </ul>
            </div>


        </Layout>
    );
};


export default withAuth(MedicamentePage);
