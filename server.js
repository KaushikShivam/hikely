const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log(err);
  console.log('Uncaught Execption! Shutting down');
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('DB Connection successful');
  })
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection! Shutting down');
  server.close(() => {
    process.exit(1);
  });
});
