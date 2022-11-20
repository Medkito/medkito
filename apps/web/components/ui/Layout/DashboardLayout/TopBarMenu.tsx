import { useMeQuery } from "generated/graphql";
import Router from "next/router";
import styled from "styled-components";
import HeaderTabs from "./DashboardHeader/HeaderTabs";
import ProfilePopup from "./ProfilePopup/ProfilePopup";

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: white;
`;

const LogoText = styled.div`
  font-size: 20px;
  cursor: pointer;
  background: white;
  margin-right: 40px;
  font-weight: bold;
`;

const TopBarMenu = (props) => {
  let { classes, fixed } = props;

  const tabs = [
    {
      text: "Acasa",
      path: "/dashboard",
      action: () => {
        Router.push("/dashboard");
      },
    },
    {
      text: "inbox",
      path: "/inbox",
      action: () => {
        Router.push("/inbox");
      },
    },
    {
      text: "Programari",
      path: "/appointments",
      action: () => {
        Router.push("/appointments");
      },
    },
  ];

  const { data } = useMeQuery({ ssr: false });
  const { id, email, name, avatarUrl } = data.me;

  const find = tabs.find((tab) => tab.path == location.pathname);
  const currentTab = find ? find.text : null;

  if (!data) {
    return <div>loaading..</div>;
  }

  return (
    <Nav>
      <LogoText
        onClick={() => {
          Router.push("/dashboard");
        }}
      >
        Medkito
      </LogoText>

      <HeaderTabs disabled={false} currentTab={currentTab} tabs={tabs} />

      <ProfilePopup name={name} avatar={avatarUrl} />
    </Nav>
  );
};

export default TopBarMenu;
