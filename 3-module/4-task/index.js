
function showSalary(users, age) {
  let nameAndSalary = users
  .filter(user =>user.age <= age)
  .map(user => `${user.name}, ${user.balance}`);
  return nameAndSalary.join('\n');
}
showSalary(users,30)