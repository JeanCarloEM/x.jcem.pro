Object.prototype.has = function (k) {
  return this.hasOwnProperty(k) || typeof this[k] !== "undefined";
}

const isset = (k) => {
  return typeof k !== "undefined";
}