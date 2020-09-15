"use strict";
const validFilterOperators = ["like", "nlike", "eq", "neq"];
module.exports = filterArray => {
  const arrayOperators = [];
  filterArray.forEach((value, index) => {
    let _object = Object.keys(value);

    const operator = Object.keys(value[_object[0]][0])[0];
    const param = value[_object[0]][0][operator];
    let _query = {};

    if (!validFilterOperators.find(_operator => _operator === operator)) {
      var error = new Error();
      error.message = "invalid filter operator";
      error.status = 400;
      throw error;
    }

    _query[operator] = operator === "like" ? `%${param}%` : param;

    const final = {};
    final[_object[0]] = _query;
    arrayOperators.push(final);
  });
  const _and = {};
  const _where = {};
  _and["and"] = arrayOperators;
  _where["where"] = _and;

  return _where;
};
