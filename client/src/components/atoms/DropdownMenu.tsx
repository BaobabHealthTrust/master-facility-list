import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/colors/grey";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MenuList, MenuItem } from "@material-ui/core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faCaretDown, faCaretUp);

const styles: any = (theme: any) => ({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: "100%",
    width: "100%"
  },
  paper: {
    position: "absolute",
    top: "90%",
    width: "auto",
    minWidth: "100%",
    textAlign: "center",
    borderRadius: "0px"
  }
});

class ClickAway extends React.Component<Props> {
  state = {
    open: false,
    isModal: false
  };

  handleClick = () => {
    this.setState((state: any) => ({
      open: !state.open
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes, options, menu, onClickOption, active } = this.props;
    const { open } = this.state;

    return (
      <div
        className={classes.root}
        // @ts-ignore
        data-test={this.props["data-test"].replace(" ", "")}
      >
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div
            style={{
              height: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%"
            }}
          >
            <Container active={active} onClick={this.handleClick}>
              {`${menu} `}
              {open ? (
                <FontAwesomeIcon
                  style={{ marginLeft: "10px" }}
                  icon={faCaretUp}
                />
              ) : (
                <FontAwesomeIcon
                  style={{ marginLeft: "10px" }}
                  icon={faCaretDown}
                />
              )}
            </Container>
            {open ? (
              <Paper className={classes.paper}>
                <MenuList>
                  {options.map((option: any) => (
                    <Link key={option.link} to={option.link}>
                      <MenuItem
                        style={{ justifyContent: "center", color: "#0d47a1" }}
                        onClick={() => {
                          option.onClick && option.onClick();
                          if (!option.link) {
                            return;
                          }

                          this.handleClickAway();
                          onClickOption(option.name);
                        }}
                        data-test={`menu${option.text.replace(" ", "")}`}
                      >
                        {option.text}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Paper>
            ) : null}
          </div>
        </ClickAwayListener>
      </div>
    );
  }
}

type Props = {
  classes: any;
  menu: any;
  options: Array<any>;
  onClickOption: Function;
  active: boolean;
};

export default withStyles(styles)(ClickAway);

const Container = styled<any>("div")`
  border-bottom: ${props => props.active && "3px solid white"};
  background-color: ${props => props.active && "rgba(0,0,0,0.2)"};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  cursor: pointer;
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
