import React from "react";
import styled from "styled-components";
import MenuItem from "../atoms/MenuItem";
import Ac from "../atoms/Ac";
import { getUser } from "../../services/helpers";
import { acActions } from "../../acl";

function Menu(props: Props) {
  const { items } = props;

  return (
    <Container className="hide-on-med-and-down">
      {items.map((item, index) =>
        item.aclAction ? (
          <Ac
            key={`${index}${item.text}`}
            role={getUser().role}
            action={item.aclAction}
            allowed={() => (
              <MenuItem
                body={item.text}
                active={item.active}
                item={item}
                dropdown={item.options ? true : false}
              />
            )}
          />
        ) : (
          <MenuItem
            key={`${index}${item.text}`}
            body={item.text}
            active={item.active}
            item={item}
            dropdown={item.options ? true : false}
          />
        )
      )}
    </Container>
  );
}

export default Menu;

type Props = {
  items: Array<{
    text: string;
    active: boolean;
    icon?: React.ReactElement;
    link?: string;
    name: string;
    options?: Array<any>;
    aclAction?: acActions;
  }>;
};

const Container = styled.div`
  display: flex;
  text-align: right;
  justify-content: right;
  height: 100%;
  align-items: center;
`;
