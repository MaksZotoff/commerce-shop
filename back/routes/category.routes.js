const express = require("express");
const fileUploads = require("express-fileupload");
const uuid = require("uuid").v4;
const db = require("../config/database");
const path = require("path")

const router = express.Router();

router.get("/all", (req, res) => {
    let categorys = db.getData('/categorys');
    res.send({
        success: true,
        category: categorys,
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    let categorys = db.getData('/categorys');
    let category = categorys.filter(element => element.id_user === id);
    if (category) {
        res.send({
            success: true,
            category: categorys,
        })
    } else {
        res.status(404).send({
            success: false,
            code: "Ничего не найдено"
        })
    }
})

router.get("/file/:fileID", (req, res) => {
    const fileId = req.params.fileID;
    let files = db.getData("/files");
    const file = files[fileId];
    if (!file) {
        return res.sendStatus(404);
    }
    res.sendFile(file.filePath);
})

router.post("/add", (req, res) => {
    const { id_user, name, price, photoFileId } = req.body;

    if (!photoFileId) {
        return res.send({ success: false })
    }
    let files = db.getData("/files");
    let category = db.getData("/categorys");
   
    const status = "В обработке"
    
    if (!files[photoFileId]) {
        res.status(404).send({ success: false })
    }
    category.push({
        id: uuid(),
        id_user,
        status,
        photoFileId
    });

    db.push("/categorys", category);
    res.send({ success: true })
})

router.post("/upload", fileUploads({ tempFileDir: true }), (req, res) => {
    if (!req.files.file) {
        return res.send({
            success: false,
            code: "Ошибка"
        });
    };

    const fileId = uuid();
    const filePath = path.join(
        __dirname,
        "..",
        "uploads",
        fileId
    );

    req.files.file.mv(filePath);
    const mimetype = req.files.file.mimetype;
    let files = db.getData("/files");
    files[fileId] = {
        mimetype,
        filePath
    };
    res.send({
        success: true,
        fileId
    });
})

router.post("/:id/delete", (req, res) => {
    const id = req.params.id;
    let categorys = db.getData('/categorys');
    categorys = categorys.filter((element) => element.id !== id);
    db.push("/categorys", categorys);
    res.send({ success: true })
})

module.exports = router;