const bodyParser = require('body-parser');
const con = require('../cluster');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.list = (req, res, next) => {
    const select = 'SELECT * FROM user'
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
exports.signup = (req, res, next) => {
    const email = req.body.email
    con.query(`SELECT * FROM user WHERE email='${email}'`,
        (err, results) => {
            if (results.length > 0) {
                res.status(401).json({
                    message: 'Email déjà utilisé !'
                });
            } else {
                console.log(req.body);
                bcrypt.hash(req.body.password, 10)
                    .then(cryptedPassword => {
                        con.query(`INSERT INTO user VALUES (NULL, '${req.body.nom}', '${req.body.email}', '${cryptedPassword}', '${req.body.photo}')`,
                            (err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).json("erreur!");
                                }
                                return res.status(201).json({
                                    message: 'Votre compte a bien été crée !'
                                });
                            }
                        );
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        });
};
exports.login = (req, res, next) => {
    const email = req.body.email
    con.query(`SELECT * FROM user WHERE email='${email}'`,
        (err, results) => {
            if (results.length > 0) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then(ok => {
                        if (!ok) {
                            res.status(401).json({ message: 'mot de passe incorrect !' })
                        } else {
                            res.status(200).json({
                                id: results[0],
                                nom: results[0],
                                email: results[0],
                                token: jwt.sign({ userID: results[0].id }, 'RANDOM_SECRET_TOKEN', { expiresIn: '24h' })
                            })
                        }
                    })
            } else {
                res.status(404).json({ message: 'l\'utilisateur est inconnu !' })
            }
        });
};