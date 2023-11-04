require('dotenv').config()
const http = require('http')
const app = require('./index')
const PORT = process.env.PORT | 8080
const server = http.createServer(app)
const {  logEvents } = require("./middleware/logger");
const mongoose = require('mongoose')

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
  server.listen(PORT, ()=> console.log(`server is running on PORT ${PORT}`) )
  )
  .catch((error) => {
    console.log("Mongo Error", error.message) 
    logEvents(
      `${err.no}:${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
  }
  );
