import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Layout from "components/ui/Layout/Layout";
import { useAddSymptomMutation, useGetSymptomsQuery } from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React from "react";
import { useForm } from "react-hook-form";


const SimptomePage = () => {
    const { data, refetch } = useGetSymptomsQuery({ fetchPolicy: "network-only" });

    const { register, handleSubmit, errors, reset } = useForm();


    const [createSymptom] = useAddSymptomMutation()

    const onSubmit = async ({ name }) => {
        try {
            await createSymptom({
                variables: {
                    name
                }
            })

            reset()
            refetch()
        } catch (error) {
            console.log("error add simptom", error)
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
                <h1>Simptome</h1>
                <div>Nr simptome: {data.symptoms.length}</div>
                <div>Nr simptome fara diagnostice: {data.symptoms.filter(x => x.diagnostice.length === 0).length}</div>



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
                        Adauga simptom
                    </Button>
                </form>

                <ul>
                    {data.symptoms.map((x) => {
                        return (
                            <li key={x.id}>
                                {x.name}
                            </li>
                        );
                    })}
                </ul>

                <h3>Fara diagnostice:</h3>
                <ul>
                    {data.symptoms.filter(x => x.diagnostice.length === 0).map((x) => {
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


export default withAuth(SimptomePage);
