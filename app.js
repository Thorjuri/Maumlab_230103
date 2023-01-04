const express = require('express');
const app = express();
const Port = 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Router = require("./routes");
const errorHandlerMiddleware = require("./middlewares/error_handler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        origin: "*", 
        allowedHeaders: ["content-Type", "Authorization"],
        exposedHeaders: ["content-Type", "Authorization"],
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH", "OPTIONS"],
        credential: "true",
    })
);

app.options("*", cors());
app.use("/api", Router);
app.use(errorHandlerMiddleware);

app.listen(Port, ()=> {
    console.log(`${Port}번 서버 실행됩니다.`);
});