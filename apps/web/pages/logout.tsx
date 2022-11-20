import withAuth from "lib/hocs/withAuth";
import { useAuth } from "lib/providers/Auth";
import { destroyCookie } from "nookies";
import { useEffect } from "react";

export default withAuth(function Logout() {
  const { setAuthenticated } = useAuth();
  useEffect(() => {
    function doLogout() {
      destroyCookie(null, "token");
      window.localStorage.setItem("logout", Date.now().toString());
      window.location.reload();
    }
    doLogout();
  }, [setAuthenticated]);
  return <p>Logging out...</p>;
}, "/");
