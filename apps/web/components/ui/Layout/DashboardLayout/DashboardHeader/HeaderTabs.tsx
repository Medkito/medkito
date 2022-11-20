import React, { useEffect } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

import useMediaQuery from "@material-ui/core/useMediaQuery";

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "capitalize",
    // fontWeight: theme.typography.fontWeightBold,
    fontSize: 16,
    color: "#333333",
    "&:hover": {
      color: "#00286A",
    },
    "&$selected": {
      color: "#00286A",
      fontWeight: 600,
    },
  },
  selected: {},
}))((props: any) => <Tab disableRipple {...props} />);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  bigIndicator: {
    background: "#00286A",
    transition: "none",
    height: 3,
  },
  tabs: {
    display: "flex",
  },
});

export default function HeaderTabs({ tabs, currentTab, disabled = false }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const initialTab = tabs.findIndex((tab) => tab.text === currentTab);
    setValue(initialTab !== -1 ? initialTab : 0);
  }, [setValue, tabs, currentTab]);

  function handleChange(event, newValue) {
    setValue(newValue);
    tabs[newValue].action();
  }

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Tabs
      classes={{ indicator: classes.bigIndicator, scroller: classes.tabs }}
      variant="scrollable"
      scrollButtons="auto"
      value={value}
      onChange={handleChange}
    >
      {tabs.map((tab) => (
        <StyledTab disabled={disabled} key={tab.text} label={tab.text} />
      ))}
    </Tabs>
  );
}
