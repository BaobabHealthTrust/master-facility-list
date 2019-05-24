import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const SearchDrawer = (props: Props) => {
  const { open, onClose, items } = props;
  return (
    <SwipeableDrawer
      open={open}
      onOpen={() => {}}
      onClose={() => onClose(false)}
    >
      <List>
        {items.map((item, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              <>{item.icon}</>
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};
export default SearchDrawer;

type Props = {
  open: boolean;
  onClose: Function;
  items: Array<{
    text: string;
    active: boolean;
    icon?: React.ReactElement;
  }>;
};
