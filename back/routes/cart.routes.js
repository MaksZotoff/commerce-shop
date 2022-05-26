const express = require("express");
const fileUploads = require("express-fileupload");
const uuid = require("uuid").v4;
const db = require("../config/database");
const path = require("path")
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/all", (req, res) => {
    let carts = db.getData('/carts');
    res.send({
        success: true,
        cart: carts,
    });
});

router.post("/confirm", (req, res) => {
    const { data, password, Data } = req.body
    const id = data.id_user

    let users = db.getData('/users');
    let cart = db.getData('/carts');
    const status = "Новый"
    const currentUser = users.filter(e => e.id_user === id)[0] || {};
    let passwordValid = bcrypt.compareSync(
        password,
        currentUser.passwordHash
    );
    if (!passwordValid) {
        return res.send({
            success: false,
            code: "Invalid login or password"
        });
    }
    cart.push({
        id: uuid(),
        id_user: data.id_user,
        status: status,
        Data: Data
    });
    db.push('/carts', cart)
    res.send({
        success: true,
        message: "Заказ сформирован ожидайте",
    });
});

router.get("/:user", (req, res) => {
    const user = req.params.user;
    let carts = db.getData('/carts');
    let cart = carts.filter(element => element.id_user === user);
    if (cart) {
        res.send({
            success: true,
            cart: carts,
        })
    } else {
        res.status(404).send({
            success: false,
            code: "Ничего не найдено"
        })
    }
})


router.post("/add", (req, res) => {
    const { user, data } = req.body;

    if (!name || !price ) {
        return res.send({ success: false })
    }
    let users = db.getData("/users");
    let cart = db.getData("/carts");

    const status = "В обработке"
    
    cart.push({
        id: uuid(),
        id_user: user.id_user,
        data:data,
        status: status
    });

    db.push("/carts", cart);
    res.send({ success: true, message:'Заказ оформлен' })
})


router.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    let carts = db.getData('/carts');
    carts = carts.filter((element) => element.id !== id);
    db.push("/carts", carts);
    res.send({ success: true })
})

module.exports = router;