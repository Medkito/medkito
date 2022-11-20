import LoadingIndicator from "components/ui/LoadingIndicator";
import React from "react";

const QueryResult = ({
  loading,
  error,
  data,
  children,
  LoadingPlaceholder,
}: any) => {
  if (loading) {
    return LoadingPlaceholder ? <LoadingPlaceholder /> : <LoadingIndicator />;
  } else if (error) {
    return <p>EROARE</p>;
  } else {
    return children({ data });
  }
};

export default QueryResult;
