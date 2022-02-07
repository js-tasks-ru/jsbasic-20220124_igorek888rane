function getMinMax(str) {
  let result = {};
  let arr = str.split(" ");
  
  let arrNumber = arr
    .map((el) => Number(el))
    .filter((el) => {
      if (isNaN(el) === false) return el;
    });

  result.min = arrNumber.reduce((prev, item) => {
    if (item < prev) return item;
    else return prev;
  }, arrNumber[0]);

  result.max = arrNumber.reduce((prev, item) => {
    if (item > prev) return item;
    else return prev;
  }, arrNumber[0]);

  return result;
}
