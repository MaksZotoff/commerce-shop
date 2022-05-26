const express = require("express");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4
const db = require("../config/database");


const router = express.Router();

router.post("/signup", (req, res) => {
    const { name, surname, patronym, login, email, password } = req.body;
    const roles = "user";

    if (!login || !email || !password || !name || !surname || !patronym) {
        return res.send("WRONG_REQUEST")
    }
    passwordHash = bcrypt.hashSync(password, 8)
    
    const id_user = uuid();
    let users = db.getData('/users');


    users.push({
        id_user,
        name, 
        surname, 
        patronym,
        login,
        email,
        passwordHash,
        roles,
    })
    db.push('/users', users)
     res.send({ success: true });
})

module.exports = router