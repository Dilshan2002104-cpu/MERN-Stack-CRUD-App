const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/UserRoutes"); 
const app = express(); 

//Middleware
app.use(express.json());
app.use("/users", router);

mongoose
    .connect("mongodb+srv://admin:moNUctMdTIgGV1Nz@cluster0.hiffp.mongodb.net/YourDatabaseName") // Add database name if needed
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });
    })
    .catch((err) => console.log(err));
