"use strict";

module.exports = async (filteredArray, mapData) => {
  const _r = filteredArray.map(async data => {
    const key = Object.keys(data)[0];
    const newKey = mapData[key];

    if (typeof newKey === "object") {
      const _condition = {};
      const _finalCondition = {};
      const _operator = Object.keys(data[key][0])[0];

      _condition[newKey._name] = Object.values(data[key][0])[0];

      const op = {};
      op[_operator] = await newKey.model(_condition);
      _finalCondition[newKey.name] = [op];
      return _finalCondition;
    }
    const _newObject = {};
    _newObject[newKey] = data[key];
    return _newObject;
  });
  return await Promise.all(_r);
};
