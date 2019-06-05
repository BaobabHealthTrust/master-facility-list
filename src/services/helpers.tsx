import React from "react";
import { MenuItem } from "@material-ui/core";
// @ts-ignore
import { intersection, slice } from "lodash";

export const renderOptions = (dependancy: any, entityName: string) => {
  return dependancy.map((entity: any) => (
    <MenuItem key={entity.id} value={entity.id}>
      {entity[entityName]}
    </MenuItem>
  ));
};

// @ts-ignore
export const groupIntersect = (val: Array<any>) => {
  const mapped = val.filter(
    value => value != null || typeof value != "undefined"
  );

  if (mapped.length <= 1) {
    if (mapped.length == 0) return [];
    return mapped[0].filter(
      (value: any) => value != null || typeof value != "undefined"
    );
  }

  return intersection(
    mapped[0],
    groupIntersect(slice(mapped, 1, mapped.length))
  );
};

export const hasFilterValuesForType = (type: string, values: Array<any>) => {
  switch (type) {
    case "basic":
      return (
        values.filter(
          val =>
            val.type === "districts" ||
            val.type === "facilityTypes" ||
            val.type === "regulatoryStatuses" ||
            val.type === "operationalStatuses" ||
            val.type === "facilityOwners"
        ).length > 0
      );

    default:
      return values.filter(val => val.type === type).length > 0;
  }
};
