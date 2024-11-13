const User = require("../Model/UserModel");
const mongoose = require("mongoose");


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

const getById = async (req, res, next) => {
    const id = req.params.id;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    let user;
    try {
        user = await User.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving the user." });
    }

    // Not available user
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
};

const updateUser = async (req,res,next) => {
    const id = req.params.id;
    const { name, gmail, age, address } = req.body;

    let users;
    try{
        users = await User.findByIdAndUpdate(id,
            {name:name,gmail:gmail,age:age});
            users = await users.save();
    }catch(err){
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ users });
    
};

const deleteUser = async(req,res,next) => {
    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
    }
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
}

exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser =updateUser;
