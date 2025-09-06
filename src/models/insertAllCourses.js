require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Course = require("./courses"); // adjust path

// Connect to MongoDB
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Path to your main data folder
const dataFolder = path.join(__dirname, "../../Data");

// Recursive async function to read and insert JSON files
async function insertJSONFiles(dir) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // Recursively process folder
            await insertJSONFiles(fullPath);
        } else if (item.endsWith(".json")) {
            try {
                const fileContent = fs.readFileSync(fullPath, "utf-8");
                if (!fileContent) continue; // skip empty files

                const jsonData = JSON.parse(fileContent);

                // Prepare data with random rating
                let dataToInsert = [];
                if (Array.isArray(jsonData)) {
                    dataToInsert = jsonData.map(item => ({
                        ...item,
                        rating: Math.floor(Math.random() * 6) // random 0-5
                    }));
                } else {
                    dataToInsert = [{
                        ...jsonData,
                        rating: Math.floor(Math.random() * 6)
                    }];
                }

                // Insert into MongoDB
                await Course.insertMany(dataToInsert);
                console.log(`✅ Inserted data from ${fullPath}`);
            } catch (err) {
                console.error(`❌ Error inserting ${fullPath}:`, err);
            }
        }
    }
}

// Start insertion
(async () => {
    await insertJSONFiles(dataFolder);
    console.log("🎉 All files processed");
    mongoose.disconnect();
})();
