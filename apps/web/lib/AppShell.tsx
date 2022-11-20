import { useMeQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

const Redirects = ({ children, isAuth, me }) => {
  const { pathname, events } = useRouter();

  const [checkCompleted, setCheckCompleted] = useState(false);

  if (!isAuth) {
    return <>{children}</>;
  }

  const updateLocal = async (data) => {
    setCheckCompleted(true);
  };

  useEffect(() => {
    updateLocal(me);
  }, [pathname]);

  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = (url) => {
      if (url !== "/" && !me) {
        window.location.href = "/";
      }
    };

    // Check that initial route is OK
    if (pathname !== "/" && me === null) {
      window.location.href = "/";
    }

    // Monitor routes
    events.on("routeChangeStart", handleRouteChange);
    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [me]);

  if (!checkCompleted || !me) {
    return <></>;
  }

  return <>{children}</>;
};

const AppShell = ({ children, isAuth }) => {
  if (!isAuth) {
    return <Fragment>{children}</Fragment>;
  }

  const { data } = useMeQuery({ ssr: false });

  if (!data) {
    return null;
  }

  return (
    <Redirects isAuth={isAuth} me={data.me}>
      {children}
    </Redirects>
  );
};

export default AppShell;
