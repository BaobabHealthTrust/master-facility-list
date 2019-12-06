import styled from "styled-components";

export const drawerWidth = 360;

export const DesktopView = styled.div.attrs({
  className: "hide-on-med-and-down"
})``;
export const MobileView = styled.div.attrs({
  className: "hide-on-large-only"
})``;
export const MobileTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

export const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    paddingLeft: `calc(${drawerWidth}px + 150px)`,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: `calc(100% + ${drawerWidth}px)`,
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    paddingLeft: `calc(${drawerWidth}px + 115px)`,
    width: "100%",
    marginLeft: 0
  }
});
