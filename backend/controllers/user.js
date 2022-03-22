const con = require('../cluster');
const User = require('../models/user');

exports.list = (req, res, next) => {
    const select = 'select * from user'
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new User(item['id'], item['nom'], item['email'], item['password'], item['photo']))
            })
        }
        res.status(201).json({ list })
    })
}