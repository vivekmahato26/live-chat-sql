require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("express");
const userRouter = require("./routes/userRoute");
const msgRouter = require("./routes/messageRouter");

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/messages", msgRouter);

app.listen(4000, () => console.log("server runnning at port 4000"));
