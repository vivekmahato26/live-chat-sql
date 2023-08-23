const { genSalt, hash } = require("bcrypt");
const cryptoJs = require("crypto-js");
const sqlPromise = require("../mysqlConfig");

const register = async(req) => {
    const [rows,fileds] = await sqlPromise.query(`SELECT * FROM users WHERE email="${req.body.email}"`);
    if(rows.length) throw new Error("Email already registered");
    const salt = await genSalt();
    const hashPass = await hash(req.body.password,salt);
    const data = await sqlPromise.query(`INSERT INTO users (username,email,password,name) VALUES("${req.body.username}","${req.body.email}","${hashPass}","${req.body.name}")`);
    return data;
}

const login = async(req) => {
    const [rows,fileds] = await sqlPromise.query(`SELECT * FROM users WHERE email="${req.body.email}"`);
    if(!rows.length) throw new Error("Email not found");
    const token = cryptoJs.AES.encrypt(JSON.stringify({
        id: rows[0].id,
        email: rows[0].email
    }), "qwertyuiop").toString();
    return {
        ...rows[0],
        token
    }
}

const updateUser = async(req) => {
    const str = "";
    const keys = Object.keys(req.body);
    keys.forEach(e => {
        str += `${e}=${req.body[e]},`;
    });
    const data = await sqlPromise.query(`UPDATE users SET ${str.slice(0,-1)}  WHERE id=${req.params.userId}`);
    return {
        data
    }
}

const deleteUser = async(req) => {
    const data = await sqlPromise.query(`DELETE FROM users WHERE id=${req.params.userId}`);
    return {
        data
    }
}

module.exports = {register,login};