const mongoose = require('mongoose')

mongoose.connect(process.env.DB).then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log('no connection'+e);
})


