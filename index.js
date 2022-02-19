const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
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

const url = "https://wallet-watcher-server.vercel.app";
// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

bot.on("message", (message) => {
    let chat_id = message.from.id;
    bot.sendMessage(chat_id, "I'm alive!");
});
