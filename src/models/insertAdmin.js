require('dotenv').config(); // Load .env variables
const mongoose = require('mongoose');
const Admin = require('./admin_sign_in'); // Adjust path if needed
const bcrypt = require('bcrypt');

// Debug: check if DB URI is loaded
console.log("MongoDB URI:", process.env.DB);

// Connect to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Function to insert admin or sub-admin
const createUser = async ({email, password, secret_code, name, designation, image}) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Admin({
            email,
            password: hashedPassword,
            secret_code,
            name,
            designation,
            image
        });

        const savedUser = await user.save();
        console.log(`${designation} inserted:`, savedUser);
    } catch (error) {
        console.error(`Error inserting ${designation}:`, error);
    }
};

// Insert Admin and Sub-Admin with same email & password, different secret codes
const createUsers = async () => {
    const commonEmail = "Team8@gmail.com";
    const commonPassword = "team8";

    await createUser({
        email: commonEmail,
        password: commonPassword,
        secret_code: "12345",
        name: "Team 8 Admin",
        designation: "Super Admin",
        image: "https://example.com/admin-image.jpg"
    });

    await createUser({
        email: commonEmail,
        password: commonPassword,
        secret_code: "54321",
        name: "Team 8 Sub-Admin",
        designation: "Sub Admin",
        image: "https://example.com/subadmin-image.jpg"
    });

    mongoose.connection.close();
};

createUsers();
