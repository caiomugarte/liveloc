const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDb = require("./config/db");

const app = express();

connectDb();

const port = process.env.NODE_LOCAL_PORT || 3020;

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:19006'
}))
app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/", require("./routes/user"));
app.use("/", require("./routes/posicao"));
app.use("/", require("./routes/login"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})