import React from "react";
import { MenuItem } from "@material-ui/core";
// @ts-ignore
import { intersection, slice, uniqWith } from "lodash";

export const renderOptions = (dependancy: any, entityName: string) => {
  return dependancy.map((entity: any) => (
    <MenuItem key={entity.id} value={entity.id}>
      {entity[entityName]}
    </MenuItem>
  ));
};

export const renderOptionsWithObject = (
  dependancy: any,
  entityName: string
) => {
  return dependancy.map((entity: any) => (
    <MenuItem key={entity.id} value={entity}>
      {entity[entityName]}
    </MenuItem>
  ));
};

export const getServicesLeaves: any = (hierachy: Array<any>) => {
  let leaves: Array<any> = [];
  for (let leaf of hierachy) {
    leaves =
      leaf.children.length == 0
        ? [...leaves, leaf]
        : [...leaves, ...getServicesLeaves(leaf.children)];
  }
  return leaves;
};

export const getServicesHierachy: any = (
  services: Array<any>,
  allServices: Array<any> = [],
  level: number = 0
) => {
  const curServices =
    level == 0
      ? services.filter(ser => ser.service_category_id == 0)
      : [...services];

  allServices = level == 0 ? services : allServices;

  if (curServices.length == 0) {
    return [];
  }

  return curServices.map(service => ({
    ...service,
    serviceType: {},
    children: getServicesHierachy(
      allServices.filter(ser => ser.service_category_id == service.id),
      allServices,
      level + 1
    )
  }));
};

export const getServicesFromLeaves = (
  leaves: Array<any>,
  allServices: Array<any> = [],
  accServices: Array<any> = []
) => {
  let services: Array<any> = [...accServices];

  for (let leaf of leaves) {
    services =
      leaf.service_category_id == 0
        ? [...services, leaf]
        : [
            ...services,
            leaf,
            ...getServicesFromLeaves(
              allServices.filter(ser => ser.id == leaf.service_category_id),
              allServices,
              services
            )
          ];
  }
  return uniqWith(
    services,
    (curSer: any, nextSer: any) => curSer.id == nextSer.id
  );
};

export const groupIntersect: any = (val: Array<any>) => {
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

export const isAdmin = () => sessionStorage.getItem("token");
