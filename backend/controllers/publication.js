const con = require('../cluster');
const Publication = require('../models/publication');

exports.list = (req, res, next) => {
    const select = 'select * from publication'
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
}