// function showSalary(users, age) {
//   let nameAndSalary = users
//   .filter(user =>user.age <= age)
//   .map(user => `${user.name}, ${user.balance}`);
//   return nameAndSalary.join('\n');
// }
function showSalary(users, age) {
  let nameAndSalary =  users.reduce((names, user) => {
    if (user.age <= age) {
      names.push(`${user.name}, ${user.balance}`);
    }
    return names;
  }, []);
  return nameAndSalary.join("\n");
}
