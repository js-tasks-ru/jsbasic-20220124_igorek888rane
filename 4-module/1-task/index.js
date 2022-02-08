function makeFriendsList(friends) {
  const newUl = document.createElement("Ul");
  let friendsList = friends.map((user) => {
    return `${user.firstName} ${user.lastName}`;
  });

  for (const friend of friendsList) {
    newUl.insertAdjacentHTML('beforeEnd', `<li>${friend}</li>`);
  }

  return newUl;
}
