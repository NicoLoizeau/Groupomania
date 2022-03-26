const con = require('../cluster');
const Commentaire = require('../models/commentaire');


exports.newCom = (req, res, next) => {
    const postCom = `NULL, '${req.body.commentaires}', '${req.body.date}', '${req.body.user}', '${req.body.publication}'`;
    const insert = `INSERT INTO commentaires VALUES (${postCom})`;
    con.query(insert, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json("erreur!");
        } else {
            return res.status(201).json({
                message: 'Votre commentaire a bien été créée !'
            })
        };

    })
}

exports.allComPub = (req, res, next) => {
    const pub = req.body.publication;
    const select = `SELECT * FROM commentaires WHERE publication = ${pub}`;
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new Commentaire(item['id'], item['commentaire'], item['date'], item['user'], item['publication']))
            })
        }
        res.status(200).json({ list })
    })
}
exports.delOneCom = (req, res, next) => {
    const user = req.body.user;
    const id = req.body.id;
    con.query(`SELECT * FROM commentaires WHERE user = ${user} AND id = ${id}`,
        (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.status(401).json({ message: 'Vous n\'avez pas de commentaires à supprimer !' })
            } else {
                const delCom = `DELETE FROM commentaires WHERE id = ${id} AND user = ${user}`;
                con.query(delCom, (error, result) => {
                    if (error) throw error
                    res.status(201).json({ message: 'commentaire supprimé !' })
                })
            }
        });
}