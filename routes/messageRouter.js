const {Router} = require("express");
const { sendMessage } = require("../controllers/messageController");

const msgRouter = Router();

msgRouter.post("/send", async(req,res) => {
    try {
        const data = await sendMessage(req)
        res.send(data)
    } catch (error) {
        res.send({err:error.message})
    }
})

module.exports = msgRouter;