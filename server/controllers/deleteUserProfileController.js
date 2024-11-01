const User = require('../models/User');
const UserProfile = require('../models/UserProfile');

// This controller takes the provided id
exports.deleteUser = async (req, res) => {
  const id = req.params.user_id; // Access the user id from req.params (ensure it matches the route)

  console.log("Attempting to delete user with ID:", id);
  
  try {
    // Optionally, fetch the user info before deleting
    const userInfo = await UserProfile.find(id); // Assuming this function retrieves user info based on ID
    
    // Delete the user profile from the user_profile table
    const userProfileDeleted = await UserProfile.delete(id);
    // console.log(userProfileDeleted)
    // Delete the user from the users table
    const userDeleted = await User.delete(id); 
    // console.log(userDeleted)

    return res.status(200).send({ message: "User deleted successfully", userInfo });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).send({ error: "An error occurred while deleting the user." });
  }
};

