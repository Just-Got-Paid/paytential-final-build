const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

// This controller takes the provided username and password and finds
// the matching user in the database. If the user is found and the password
// is valid, it adds the userId to the cookie (allowing them to stay logged in)
// and sends back the user object.
exports.createUser = async (req, res) => {
  const { username, password, organization, isAdmin } = req.body // the req.body value is provided by the client

  console.log("test hit")
  // const user = await User.findByUsername(username);
  // if (!user) return res.sendStatus(404);

  // console.log(username, password)
  
  const newUser = await User.create(username, password) // this makes the new user in users table
  // console.log(test, "test", username, password)
  

  await UserProfile.create(newUser.id, organization, isAdmin)


  const userInfo = await UserProfile.find(newUser.id)

  req.session.userId = newUser.id;

  res.send(userInfo);
};
