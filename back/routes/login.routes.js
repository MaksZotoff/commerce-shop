const express = require("express")
const bcrypt = require("bcryptjs");
const db = require("../config/database")
const router = express.Router();
const uuid = require("uuid").v4

router.post("/login", (req, res) => {
    const { login, password } = req.body;

    if (typeof login !== "string" || typeof password !== "string") {
        res.status(404).send({
            success: false,
            message: "Пользователь не найден"
        });
        return;
    }
    let users = db.getData('/users');

    const currentUser = users.filter((e) => e.login === login)[0] || {};

    let passwordValid = bcrypt.compareSync(
        password,
        currentUser.passwordHash
    );

    if (!passwordValid) {
        res.status(401).send({
            success: false,
            error: "Логин или пароль неверны"
        });
        return;
    }

    const token = uuid();
    db.push(`/sessions/${token}`, currentUser.id_user)

    res.status(200).send({ 
        id_user: currentUser.id_user, 
        accessToken: token, 
        roles: currentUser.roles, 
        login: currentUser.login,
        email: currentUser.email
    })
    console.log("success login")
});

router.get("/users", (req, res) => {
    const users = db.getData('/users');
    res.send({
        success: true,
        users: users,
    });
})

module.exports = router;