const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB conneted to [${process.env.MONGO_URI}]...`))
    .catch(err => console.error(err));

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
//     // Disconnect after the query
//     mongoose.connection.close();
// });