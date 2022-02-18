const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

require("dotenv").config();

app.use(
    cors({
        origin: ["https://wallet-watcher.vercel.app", "https://wallet-watcher.vercel.app/", "http://localhost:3000"],
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

function listen() {
    try {
        app.listen(PORT, () => {
            console.log("Server running on port:", PORT);
        });
    } catch (err) {
        console.log(err);
    }
}

Promise.all([])
    .then(listen)
    .catch((err) => {
        console.log("Error:", err);
    });
