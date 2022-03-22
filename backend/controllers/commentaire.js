const con = require('../cluster');
const Commentaire = require('../models/commentaire');

exports.list = (req, res, next) => {
    const select = 'select * from commentaires'
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new Commentaire(item['id'], item['commentaire'], item['date'], item['user'], item['publication']))
            })
        }
        res.status(201).json({ list })
    })
}