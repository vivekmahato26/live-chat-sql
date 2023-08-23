const sqlPromise = require("../mysqlConfig")

const sendMessage = async (req) => {
    const [rows,fields] = await sqlPromise(`INSER INTO messages (sender,receiver,message) VALUES(${req.body.sender},${req.body.receiver},${req.body.message})`);
    const messageId = rows.insertId;
    const senderData = await sqlPromise(`SELECT messages FROM users WHERE id=${req.body.sender}`)
    const receiverData = await sqlPromise(`SELECT messages FROM users WHERE id=${req.body.receiver}`)
    let senderMessage,receiverMessage;
    if(!senderData[0][0].messages) senderMessage = JSON.stringify([messageId]);
    else {
        let tempdata = JSON.parse(senderData[0][0].messages).push(messageId)
        senderMessage = JSON.stringify(tempdata)
    }
    if(!receiverData[0][0].messages) receiverMessage = JSON.stringify([messageId]);
    else {
        let tempdata = JSON.parse(receiverData[0][0].messages).push(messageId)
        receiverMessage = JSON.stringify(tempdata)
    }
     await sqlPromise(`UPDATE users SET messages=${senderMessage} WHERE id=${req.body.sender}`);
     await sqlPromise(`UPDATE users SET messages=${receiverMessage} WHERE id=${req.body.receiver}`);
    return rows
}

module.exports  = {sendMessage}