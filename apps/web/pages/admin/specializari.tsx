import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Layout from "components/ui/Layout/Layout";
import { useAddSpecialtyMutation, useSpecialtiesQuery } from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React from "react";
import { useForm } from "react-hook-form";


const SpecializariPage = () => {
    const { data, refetch } = useSpecialtiesQuery({ fetchPolicy: "network-only" });

    const { register, handleSubmit, errors, reset } = useForm();


    const [createSpecialty] = useAddSpecialtyMutation()

    const onSubmit = async ({ name }) => {
        try {
            await createSpecialty({
                variables: {
                    name
                }
            })

            reset()
            refetch()
        } catch (error) {
            console.log("error add specialty", error)
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
                <h1>Specializari</h1>
                <div>Nr specializari: {data.specialties.length}</div>


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            name="name"
                            inputRef={register({ required: true })}
                            label="name"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={errors.name ? true : false}
                        />
                    </div>
                    <Button type="submit" color="primary">
                        Adauga specializare
                    </Button>
                </form>

                <ul>
                    {data.specialties.map((x) => {
                        return (
                            <li key={x.id}>
                                {x.denumire}
                            </li>
                        );
                    })}
                </ul>
            </div>


        </Layout>
    );
};


export default withAuth(SpecializariPage);
