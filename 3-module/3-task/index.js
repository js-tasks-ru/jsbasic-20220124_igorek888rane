function camelize(str) {
  let arrStr = str.split('-');
  const oneEl = arrStr[0];
  let arrUp = arrStr
  .filter(el => el !==arrStr[0])
  .map(el => el[0].toUpperCase() + el.slice(1));
  arrUp.unshift(oneEl);
  return arrUp.join("");

}
console.log(camelize('list-style-image'));
