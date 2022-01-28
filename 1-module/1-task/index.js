function factorial(n) {
  let array = [];
  if(n===0){
      return 1;
  }
  else{
  for (let i = 0; i < n; i++) {
    let num = n - i;
    array.push(num);
  }
  let result = array.reduce(function(multiply,current){
    return multiply * current;
});
return result;
  }
}
