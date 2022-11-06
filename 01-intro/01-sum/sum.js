function sum(a, b) {
  if (typeof(a + b) === "number") return a + b;
  throw new TypeError('Type Error');
}

module.exports = sum;
