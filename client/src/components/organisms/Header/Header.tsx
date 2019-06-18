import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAlignJustify,
  faLock,
  faBullhorn
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Home,
  AddBox,
  People,
  Shuffle,
  AccountCircle,
  InfoRounded
} from "@material-ui/icons";
import Menu from "../../molecules/Menu";
import Search from "../../molecules/Search";
import MobileMenu from "../../molecules/MobileMenu";
import SearchContainer from "./SearchContainer";
import BaselineMenu from "../../molecules/MobileBaselineMenu";
import ChangePassword from "../../../scenes/Users/ChangePassword";

library.add(faAlignJustify);

const Header = (props: Props) => {
  const {
    activePage,
    auth,
    logout,
    onClickSearchItem,
    onSearchValueChange,
    searchOpen,
    toggleSearch,
    onPasswordChange
  } = props;

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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
      options: [
        { text: "Logout", link: `/`, onClick: logout },
        { text: "Change Password", onClick: () => setModalOpen(true) }
      ]
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

  const mobileMenu = publicMenuItems.filter(m => m.text != "Login");

  const baselineMenu = [
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
      text: "About MHFR",
      name: "About",
      active: isActivePage("about"),
      link: `/about`,
      icon: <InfoRounded />
    },
    {
      text: "Feedback",
      name: "Feedback",
      link: `/feedback`,
      active: isActivePage("feedback"),
      icon: <FontAwesomeIcon style={{ fontSize: "24px" }} icon={faBullhorn} />
    }
  ];

  const menuItems = auth.authenticated ? adminMenuItems : publicMenuItems;

  return (
    <Container>
      <AppBar>
        <StyledToolbar>
          <MenuContainer>
            <ToolsContainer>
              <Logo src="/static/images/logo.png" />
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                className="hide-on-small-only"
              >
                {`Master Health Facility Registry`.toUpperCase()}
              </Typography>
              <Typography
                variant="h5"
                color="inherit"
                noWrap
                className="hide-on-med-and-up"
              >
                {`MHFR`.toUpperCase()}
              </Typography>
              <Search onClick={toggleSearch} className="hide-on-med-and-down" />
            </ToolsContainer>

            <MobileMenu
              items={mobileMenu}
              open={isMenuOpen}
              onClose={() => setMenuOpen(!isMenuOpen)}
            />
            <BaselineMenu items={baselineMenu} />
            <div style={{ display: "flex" }}>
              <Search
                onClick={toggleSearch}
                className="hide-on-large-only"
                style={{ margin: "15px 0px", backgroundColor: "transparent" }}
              />
              <StyledMenuIcon
                className="hide-on-large-only waves-effect waves-light"
                color="inherit"
                aria-label="Open drawer"
                onClick={() => setMenuOpen(!isMenuOpen)}
              >
                <MenuIcon />
              </StyledMenuIcon>
            </div>
            <Menu items={menuItems} />
            <ChangePassword
              open={modalOpen}
              setOpen={setModalOpen}
              onSubmit={onPasswordChange}
            />
          </MenuContainer>
        </StyledToolbar>
      </AppBar>
      {searchOpen && (
        <SearchContainer
          onClickSearchItem={onClickSearchItem}
          onChange={onSearchValueChange}
          onClose={toggleSearch}
        />
      )}
    </Container>
  );
};

export default Header;

type Props = {
  activePage: string;
  auth: any;
  logout: Function;
  onClickSearchItem: Function;
  onSearchValueChange: Function;
  toggleSearch: Function;
  searchOpen: boolean;
  onPasswordChange: Function;
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
