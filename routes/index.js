const { sendTelegramWelcomeMessage } = require("../app/index.js");

module.exports = function (app) {
    app.get("/", function (req, res) {
        sendTelegramWelcomeMessage(req, res);
        res.send(
            '<body style="font-family: Helvetica !important; background-color: black; padding: 0;margin:0;">' +
                '<div style="display: flex; flex:1; height: 100% ; justify-content: center; align-items: center; min-height: 100vh !important; font-size: 28px !important; color: white !important;">' +
                "Wallet Watcher server is running...</div></body>"
        );
    });

    app.get("/api/send-telegram-welcome-message", sendTelegramWelcomeMessage);
};
