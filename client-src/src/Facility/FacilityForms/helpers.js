//@flow
import React from 'react';

export const renderOptions = (dependancy, entityName: string) => {
  return dependancy.map(entity => (
    <option
      key={entity.id}
      value={entity.id}
    >
      {entity[entityName]}
    </option>
  ))
}
