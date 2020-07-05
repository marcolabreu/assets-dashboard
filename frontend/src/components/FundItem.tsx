import React, { Fragment, useState } from "react";
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

export const FundItem: React.FC<{
  fund_id: string;
  name: string;
  subfunds: {
    [subfund_id: string]: {
      name: string;
    };
  };
}> = function ({ fund_id, name, subfunds }) {
  const [open, setOpen] = useState(false);

  // console.log(subfunds);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Fragment key={fund_id}>
      <ListItem button onClick={handleClick} aria-label={name}>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense disablePadding>
          {Object.entries(subfunds).map(([subfund_id, { name }]) => {
            return (
              <ListItem key={subfund_id} button>
                <ListItemText primary={name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </Fragment>
  );
};
