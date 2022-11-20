import Layout from "components/ui/Layout/Layout";
import { useMedicsQuery } from "generated/graphql";
import withAuth from "lib/hocs/withAuth";
import React from "react";


const MediciPage = () => {
    const { data } = useMedicsQuery({ fetchPolicy: "network-only" });

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
                <h1>Medici</h1>
                <div>Nr medici: {data.medics.length}</div>

                <ul>
                    {data.medics.map((x) => {
                        return (
                            <div style={{ marginBottom: 20, border: "1px solid grey" }} key={x.id}>
                                <h5>{x.name}</h5>
                                <p>Email: {x.email}</p>
                                <p>Specializari: {x.specialties.map(x => x.denumire).join(", ")}</p>
                            </div>
                        );
                    })}
                </ul>
            </div>
        </Layout>
    );
};


export default withAuth(MediciPage);
