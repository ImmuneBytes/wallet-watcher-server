// const chat_id = "-1001515667431";
// let message = "Note: ";

// async function getBot(req, res) {
//     // try {
//     //     axios.get("https://api.telegram.org/bot" + token + "/getMe").then((res) => {
//     //         console.log(`statusCode: ${res.status}`);
//     //         console.log(res);
//     //     });
//     // } catch (error) {
//     //     console.log("ERROR-", error.message);
//     //     res.status(error.status);
//     // }

//     try {
//         axios.get("https://api.telegram.org/bot" + token + "/sendMessage?chat_id=" + chat_id + "&text=" + message).then((res) => {
//             console.log(`statusCode: ${res.status}`);
//             console.log(res);
//         });
//     } catch (error) {
//         console.log("ERROR-", error.message);
//         res.status(error.status);
//     }
// }

// export default getBot;

// user will enter username

// Moralis.Cloud.httpRequest({
//     url: "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
//     method: "POST",
//     crossDomain: true,
//     headers: {
//         "Content-Type": "application/json",
//         "cache-control": "no-cache",
//     },
//     params: "chat_id=" + chat_id + "&text=" + message,
// }).then(
//     function (httpResponse) {
//         logger.info(httpResponse.text);
//     },
//     function (httpResponse) {
//         logger.info("Request failed with response code " + httpResponse.status);
//     }
// );
