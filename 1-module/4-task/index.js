function checkSpam(str) {
  let strLower = str.toLowerCase();
  if(strLower.includes('1xbet')||strLower.includes('xxx')){
    return true;
  }else{
    return false;
  }
}
