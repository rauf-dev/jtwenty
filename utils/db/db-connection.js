const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const uri = process.env.DATABASE_URI;
const connectDb = async function () {
  console.log('Connecting to db... hang on there')
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));
};

module.exports = connectDb;
