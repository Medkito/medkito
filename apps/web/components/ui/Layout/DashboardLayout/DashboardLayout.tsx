import { withStyles } from "@material-ui/core/styles";
import { classList } from "lib/utils";
import Scrollbar from "react-perfect-scrollbar";
import TopBarMenu from "./TopBarMenu";

const styles = (theme) => {
  return {
    layout: {
      backgroundColor: theme.palette.background.default,
    },
  };
};

const DashboardLayout = (props) => {
  let { classes, children } = props;

  const handleSidebarToggle = () => {};

  return (
    <div
      className={classList({
        [classes.layout]: true,
      })}
    >
      <div className="content-wrap position-relative">
        <TopBarMenu handleSidebarToggle={handleSidebarToggle} fixed={true} />

        <Scrollbar className="scrollable-content">
          <div className="content">{children}</div>
          <div className="my-auto" />
        </Scrollbar>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(DashboardLayout);
