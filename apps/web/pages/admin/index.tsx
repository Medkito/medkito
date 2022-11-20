import { makeStyles } from "@material-ui/core/styles";
import Layout from "components/ui/Layout/Layout";
import withAuth from "lib/hocs/withAuth";
import Router from "next/router";
import React from "react";



const useStyles = makeStyles((theme) => ({
    card: {
        padding: 20,
        margin: 10,
        display: "flex",
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        border: "1px solid rgba(0,0,0,.125)",
        borderRadius: ".25rem",
        "&:hover": {
            background: "#f2f8f9"
        }
    },
    container: {
        display: "flex",
        paddingTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
}));

const IndexPage = () => {
    const classes = useStyles({});

    const items = [
        { route: "/admin/medici", name: "medici" },
        { route: "/admin/medicamente", name: "medicamente" },
        { route: "/admin/simptome", name: "simptome" },
        { route: "/admin/specializari", name: "specializari" },
        { route: "/admin/diagnostice", name: "diagnostice" },
    ];


    return (
        <Layout menuType="relative">
            <div>
                <div className={classes.container}>
                    {items.map(item => {
                        return (
                            <div className={classes.card} key={item.name} onClick={() => { Router.push(item.route) }}>
                                <p>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

        </Layout>
    );
};


export default withAuth(IndexPage);
