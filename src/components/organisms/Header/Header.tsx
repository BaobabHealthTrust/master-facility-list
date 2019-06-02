import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAlignJustify, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Home,
  AddBox,
  People,
  Shuffle,
  AccountCircle
} from "@material-ui/icons";
import Menu from "../../molecules/Menu";
import Search from "../../molecules/Search";
import MobileMenu from "../../molecules/MobileMenu";

library.add(faAlignJustify);

const Header = (props: Props) => {
  const { activePage, auth, logout } = props;
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isActivePage = (page: string) =>
    page.toLowerCase() == activePage.toLowerCase();

  const adminMenuItems = [
    {
      text: "Home",
      name: "Home",
      active: isActivePage("Home"),
      icon: <Home />,
      link: `/`
    },
    {
      text: "Facilities",
      name: "Facilities",
      active: isActivePage("Facilities"),
      icon: <AddBox />,
      link: `/facilities`
    },
    {
      text: "Users",
      name: "Users",
      active: isActivePage("Users"),
      icon: <People />,
      link: `/users`
    },
    {
      text: "More",
      name: "More",
      active:
        isActivePage("More") ||
        isActivePage("about") ||
        isActivePage("feedback") ||
        isActivePage("help"),
      icon: <Shuffle />,
      options: [
        { text: "About", link: `/about` },
        { text: "Feedback", link: `/feedback` },
        { text: "Help", link: `/help` }
      ]
    },
    {
      text: `${auth.details.firstname || "Profile"}`,
      name: "Home",
      active: isActivePage("Profile"),
      icon: <AccountCircle />,
      options: [{ text: "Logout", link: `/`, onClick: logout }]
    }
  ];

  const publicMenuItems = [
    {
      text: "Home",
      name: "Home",
      active: isActivePage("Home"),
      icon: <Home />,
      link: `/`
    },
    {
      text: "Facilities",
      name: "Facilities",
      active: isActivePage("Facilities"),
      icon: <AddBox />,
      link: `/facilities`
    },

    {
      text: "More",
      name: "More",
      active:
        isActivePage("More") ||
        isActivePage("about") ||
        isActivePage("feedback") ||
        isActivePage("help"),
      icon: <Shuffle />,
      options: [
        { text: "About", link: `/about` },
        { text: "Feedback", link: `/feedback` },
        { text: "Help", link: `/help` }
      ]
    },
    {
      text: "Login",
      name: "Login",
      active: isActivePage("login"),
      icon: <FontAwesomeIcon icon={faLock} />,
      link: `/login`
    }
  ];

  const menuItems = auth.authenticated ? adminMenuItems : publicMenuItems;

  return (
    <Container>
      <AppBar>
        <StyledToolbar>
          <MenuContainer>
            <ToolsContainer>
              <StyledMenuIcon
                className="hide-on-large-only waves-effect waves-light"
                color="inherit"
                aria-label="Open drawer"
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <MenuIcon />
              </StyledMenuIcon>
              <Logo
                className="hide-on-small-only"
                src="/static/images/logo.png"
              />
              <Typography variant="h5" color="inherit" noWrap>
                {`Master Health Facility Registry`.toUpperCase()}
              </Typography>
              <Search className="hide-on-small-only" />
            </ToolsContainer>
            <Menu items={menuItems} />
            <MobileMenu
              items={menuItems}
              open={isMenuOpen}
              onClose={() => setMenuOpen(!isMenuOpen)}
            />
          </MenuContainer>
        </StyledToolbar>
      </AppBar>
    </Container>
  );
};

export default Header;

type Props = {
  activePage: string;
  auth: any;
  logout: Function;
};
const Container = styled.div`
  flex-grow: 1;
  height: 80px;
`;

const ToolsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Logo = styled.img`
  width: 70px;
  margin-right: 10px;
  @media (max-width: 620px) {
    width: 50px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 5%;
  height: 80px;
  justify-content: space-between;
  @media (max-width: 992px) {
    padding: 0px 0px;
  }
`;
const StyledToolbar = withStyles({
  root: {
    background: "#0d47a1",
    flexGrow: 1,
    height: "80px",
    fontSize: "18px"
  }
})(Toolbar);

const StyledMenuIcon = withStyles({
  root: {
    cursor: "pointer",
    "&:focus": {
      background: "rgba(0,0,0,0.5)"
    }
  }
})(Toolbar);
