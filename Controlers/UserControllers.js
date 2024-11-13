const User = require("../Model/UserModel");

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find(); // Get all users
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving users." });
    }
    if (!users) {
        return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ users }); // Display all users
};

// Add new user
const addUsers = async (req, res, next) => {
    const { name, gmail, age, address } = req.body;
    let user;

    try {
        user = new User({ name, gmail, age, address });
        await user.save();
        return res.status(201).json({ message: "User added successfully", user });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to add user" });
    }
};

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
