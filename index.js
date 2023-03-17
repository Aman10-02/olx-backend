require('dotenv').config();
// console.log(process.env)
const express = require("express");
const authRoutes = require('./routes/auth');
const addsRoutes = require('./routes/adds');
const addsUpdateRoutes = require('./routes/addsUpdate');
const userRoutes = require('./routes/user');
const conversationRoutes = require('./routes/conversation');
const messageRoutes = require('./routes/message');
const mongoose = require('mongoose');
require('./config/passport');
// const keys = require('./config/keys.env')
const cookieSession = require('cookie-session');
const passport = require('passport')
const cors = require("cors");
const path = require("path")

const app = express();
app.use(express.json());
app.use(express.text())
// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSIONCOOKIEKEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// app.use(
//     cors({
//       origin: "http://localhost:3000",
//       methods: "GET,POST,PUT,DELETE",
//       credentials: true,
//     })
//   );
app.use(
    cors({
      origin: "https://olx-campus.onrender.com",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );

// mongoose.connect("mongodb://127.0.0.1:27017/olxClone",
// () => {
//     console.log("connected")
// },
// e => console.error(e)
// )
mongoose
  .connect(process.env.MONGODBCONNECT)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });
app.use("/auth", authRoutes);
app.use("/update", addsUpdateRoutes);
app.use("/adds", addsRoutes);
app.use("/user", userRoutes);
app.use("/conversation", conversationRoutes);
app.use("/message", messageRoutes);





//app.use(express.static("http://olx-campus.onrender.com/client/build"));

//app.get('*', (req, res) => {
//  res.sendFile("http://olx-campus.onrender.com/client/build/index.html");
//});

app.get('*', (req, res) => {
  res.redirect("https://olx-campus.onrender.com/");
});



app.listen(process.env.PORT || 5000, () => {
    console.log("server is running")
})
