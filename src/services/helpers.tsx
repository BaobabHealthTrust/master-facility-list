import React from "react";
import { MenuItem } from "@material-ui/core";

export const renderOptions = (dependancy: any, entityName: string) => {
  return dependancy.map((entity: any) => (
    <MenuItem key={entity.id} value={entity.id}>
      {entity[entityName]}
    </MenuItem>
  ));
};
