const {Router} = require("express");
const { register,login } = require("../controllers/userController");

const userRouter = Router();


userRouter.post("/register", async (req,res) => {
    try {
        const data = await register(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})
userRouter.post("/login", async (req,res) => {
    try {
        const data = await login(req);
        res.send(data);
    } catch (error) {
        res.send({err: error.message})
    }
})

module.exports  = userRouter;