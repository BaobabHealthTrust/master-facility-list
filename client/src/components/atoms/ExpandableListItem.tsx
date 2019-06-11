import React from "react";
import { withStyles } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

const styles: any = (theme: any) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: "20%"
  }
});

function NestedList(props: any) {
  const { classes, item, onItemClick } = props;
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon && item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {
          //@ts-ignore
          <List component="div" disablePadding>
            {item.options.map((option: any) => (
              <ListItem button className={classes.nested}>
                <Link
                  style={{ color: "#0d47a1" }}
                  to={option.link}
                  onClick={() => {
                    onItemClick();
                  }}
                >
                  <ListItemIcon>{option.icon && option.icon}</ListItemIcon>
                  {option.text}
                </Link>
              </ListItem>
            ))}
          </List>
        }
      </Collapse>
    </>
  );
}

export default withStyles(styles)(NestedList);
