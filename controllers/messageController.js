const sqlPromise = require("../mysqlConfig")

const sendMessage = async (req) => {
    const [rows,fields] = await sqlPromise.query(`INSERT INTO messages (sender,receiver,message) VALUES(${req.body.sender},${req.body.receiver},"${req.body.message}")`);
    // const messageId = rows.insertId;
    // const senderData = await sqlPromise.query(`SELECT messages FROM users WHERE id=${req.body.sender}`)
    // const receiverData = await sqlPromise.query(`SELECT messages FROM users WHERE id=${req.body.receiver}`)
    // console.log((senderData[0][0].messages));
    // let senderMessage,receiverMessage;
    // if(!senderData[0][0].messages) senderMessage = JSON.stringify([messageId]);
    // else {
    //     let tempdata = (senderData[0][0].messages).push(messageId)
    //     senderMessage = JSON.stringify(tempdata)
    // }
    // if(!receiverData[0][0].messages) receiverMessage = JSON.stringify([messageId]);
    // else {
    //     let tempdata = (receiverData[0][0].messages).push(messageId)
    //     receiverMessage = JSON.stringify(tempdata)
    // }
    //  await sqlPromise.query(`UPDATE users SET messages=${JSON.stringify(senderMessage)} WHERE id=${req.body.sender}`);
    //  await sqlPromise.query(`UPDATE users SET messages=${JSON.stringify(receiverMessage)} WHERE id=${req.body.receiver}`);
    return rows
}

module.exports  = {sendMessage}