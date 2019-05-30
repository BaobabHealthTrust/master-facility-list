//@flow
import * as React from "react";
import { Switch, Route, Link } from "react-router-dom";
import type, { SecondaryLink } from "../../../types/helper-types";
import { Paper } from "@material-ui/core";
import MenuItem from "./MenuItem";
import styled from "styled-components";

type Props = {
  links: Array<SecondaryLink>,
  defaultActivePage: string
};

type State = {
  activePage: string
};

const CardTitle = styled.div.attrs({
  className: "mfl-card-title  bg-blue"
})``;

const CardContent = styled.div.attrs({
  className: "row"
})`
  padding: 10px 0px;
`;

const CustomePaper = styled(Paper)`
  min-height: 70vh;
  white-space: nowrap;
  @media (max-width: 390px) {
    min-height: 0px;
  }
`;
const MenuItems = [{}];

export default class SecondaryMenu extends React.Component<Props, State> {
  state = {
    activePage: this.props.defaultActivePage
  };

  handleClick(page: string, handler: ?Function): void {
    this.setState({
      activePage: page
    });

    handler && handler();
  }

  render() {
    return (
      <CustomePaper>
        <CardTitle>Facility Management</CardTitle>
        <CardContent>
          {this.props.links.map((link, index) => {
            return (
              <MenuItem
                key={link.name}
                link={link}
                active={this.state.activePage === link.name}
                handleClick={(name, clickHandler) =>
                  this.handleClick(name, clickHandler)
                }
              />
            );
          })}
        </CardContent>
      </CustomePaper>
    );
  }
}
