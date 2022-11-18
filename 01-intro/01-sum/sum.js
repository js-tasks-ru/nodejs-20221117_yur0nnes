function sum(...a) {
  let sum = 0
  a.forEach(arg => {
    if (typeof(arg) !== "number") throw new TypeError(arg + ' is NaN')
    sum += arg
  })
  return sum
}

module.exports = sum
