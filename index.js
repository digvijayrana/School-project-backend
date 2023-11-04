const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const {logger} = require('./middleware/logger')

//routes
const adminRoute = require('./routes/admin')
const userAuth = require('./routes/auth')
// const commonRoutes = require('./routes/common')

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'ejs');
app.use('/', express.static('/public'));
app.set('views', path.join(__dirname, 'views'));
app.use(logger);

app.use('/api/v1/admin',adminRoute)
app.use('/api/v1/auth',userAuth)
// app.use('/api/v1/common',commonRoutes)
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found", details: "No paths found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(errorHandler);


module.exports =app



  