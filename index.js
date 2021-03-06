const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const Moralis = require("moralis/node");

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

startMoralis = async () => {
    await Moralis.start({ serverUrl: process.env.MORALIS_SERVER_URL, appId: process.env.MORALIS_APP_ID, masterKey: process.env.MORALIS_MASTER_KEY });
    console.log("Moralis connection established!");
};

startMoralis();

addChatIdToMoralis = async (username, chat_id) => {
    console.log("1");
    const User = Moralis.Object.extend("User");
    console.log("2");
    const query = new Moralis.Query(User);
    console.log("3");
    query.equalTo("telegram", username);
    console.log("4");
    const result = await query.first({ useMasterKey: true });
    console.log("5");
    let __chat_id = result.get("chat_id");
    console.log("__chat_id:", __chat_id);

    if (!__chat_id) {
        result.set("chat_id", chat_id);
        console.log("6");
        await result.save(null, { useMasterKey: true });
        console.log("result:", JSON.stringify(result));
    } else {
        console.log("Chat id already exists");
    }
};

bot.on("message", async (message) => {
    let chat_id = message.from.id;
    let username = message.from.username;

    console.log("Sending message...");
    bot.sendMessage(chat_id, "Hi there. Thank you for subscribing to Whale Watcher by ImmuneBytes!");
    console.log("Message sent!");

    console.log("Adding ChatId:", chat_id, "to Moralis for user:", username);
    await addChatIdToMoralis(username, chat_id.toString());
    console.log("ChatId is set!");
});

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
