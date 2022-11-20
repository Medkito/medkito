import { Typography } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import DashboardLayout from "components/ui/Layout/DashboardLayout/DashboardLayout";
import withAuth from "lib/hocs/withAuth";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      background: "#f3f6ff",
      height: "90vh",
    },
  })
);

function InboxWithData() {
  return <Inbox chats={[]} />;
}

const Inbox = (props) => {
  const classes = useStyles({});
  const { chats } = props;

  if (!chats.length) {
    return (
      <div
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">No items</Typography>
      </div>
    );
  }

  return <div className={classes.root}>Items: {JSON.stringify(chats)}</div>;
};

const InboxPage = () => {
  return (
    <DashboardLayout menuType="relative">
      <InboxWithData />
    </DashboardLayout>
  );
};

export default withAuth(InboxPage);
