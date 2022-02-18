const TelegramBot = require("node-telegram-bot-api");
// const axios = require("axios");
require("dotenv").config();

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const sendTelegramWelcomeMessage = async (req, res) => {
    try {
        // Create a bot that uses 'polling' to fetch new updates
        bot.on("message", (message) => {
            let chat_id = message.from.id;
            bot.sendMessage(chat_id, "Hi there. Thank you for subscribing to Whale Watcher by ImmuneBytes!");
        });

        // res.status(200).json({ message: "Telegram welcome message sent" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

module.exports = { sendTelegramWelcomeMessage };
