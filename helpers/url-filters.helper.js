"use strict";

module.exports = filterArray => {
  return Object.keys(filterArray).map(k => {
    let _array = {};
    _array[k] = Object.keys(filterArray[k]).map(_key => {
      let _inner = {};
      _inner[_key] = filterArray[k][_key];
      return _inner;
    });

    return _array;
  });
};
