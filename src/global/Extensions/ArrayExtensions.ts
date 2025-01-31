/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/

Array.prototype.any = function () {
  return this.length > 0;
};

Array.prototype.first = function () {
  return this[0];
};

Array.prototype.firstOrDefault = function () {
  return this.any() ? this.first() : null;
};

Array.prototype.last = function () {
  return this[this.length - 1];
};

Array.prototype.lastOrDefault = function () {
  return this.any() ? this.last() : null;
};

export {};
