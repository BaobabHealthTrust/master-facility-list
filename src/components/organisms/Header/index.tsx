import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
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

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const adminMenuItems = [
    {
      text: "Home",
      active: true,
      icon: <Home />
    },
    {
      text: "Facilities",
      active: false,
      icon: <AddBox />
    },
    {
      text: "Users",
      active: false,
      icon: <People />
    },
    {
      text: "More",
      active: false,
      icon: <Shuffle />
    },
    {
      text: "Profile",
      active: false,
      icon: <AccountCircle />
    }
  ];

  const publicMenuItems = [
    {
      text: "Home",
      active: true,
      icon: <Home />
    },
    {
      text: "Facilities",
      active: false,
      icon: <AddBox />
    },
    {
      text: "More",
      active: false,
      icon: <Shuffle />
    }
  ];

  const menuItems = false ? adminMenuItems : publicMenuItems;
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
                Master Health Facility Registry
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
  padding: 0px 10%;
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
