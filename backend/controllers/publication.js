const bodyParser = require('body-parser');
const con = require('../cluster');
const Publication = require('../models/publication');

exports.newPub = (req, res, next) => {
    console.log(req.body);
    con.query(`INSERT INTO 'publication' VALUES (NULL, '${req.body.titre}', '${req.body.description}', '${req.body.image}', '${req.body.user}'`, (err, result) => {
        console.log(3);
        if (err) {
            console.log(1)
            console.log(err);
            return res.status(400).json("erreur!");
        } else {
            console.log(4)
            return res.status(201).json({
                message: 'Votre publication a bien été crée !'
            })
        };

    })
}
/*
exports.list = (req, res, next) => {
    const idPub = JSON.parse(req.body.id);
    console.log(req.body);
    const select = `SELECT * FROM publication WHERE id = ${idPub} `;
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new Publication(item['id'], item['titre'], item['description'], item['image'], item['date'], item['user']))
            })
        }
        res.status(201).json({ list })
    })
}*/