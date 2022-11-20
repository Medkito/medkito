import withoutAuth from "lib/hocs/withoutAuth";
import React from "react";
import HomepageHeader from "../components/ui/HomepageHeader/HomepageHeader";
import Layout from "../components/ui/Layout/Layout";

const IndexPage = () => {
  return (
    <Layout menuType="relative">
      <HomepageHeader />
    </Layout>
  );
};

export default withoutAuth(IndexPage);
