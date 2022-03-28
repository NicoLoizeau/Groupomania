const bodyParser = require('body-parser');
const con = require('../cluster');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
    const email = req.body.email;
    const photo = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
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
                        const newUser = `INSERT INTO user VALUES (NULL, '${req.body.nom}', '${req.body.email}', '${cryptedPassword}', '${photo}')`;
                        con.query(newUser,
                            (err) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).json("erreur!");
                                }
                                return res.status(201).json({
                                    message: 'Votre compte a bien été créé !'
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
            if (results.length == 1) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then(ok => {
                        if (!ok) {
                            res.status(401).json({ message: 'mot de passe incorrect !' })
                        } else {
                            res.status(200).json({
                                id: results[0].id,
                                nom: results[0].nom,
                                email: results[0].email,
                                token: jwt.sign({ userID: results[0].id }, 'RANDOM_SECRET_TOKEN', { expiresIn: '24h' })
                            })
                        }
                    })
            } else {
                res.status(404).json({ message: 'l\'utilisateur est inconnu !' })
            }
        });
};
exports.deleteUser = (req, res, next) => {
    const email = req.body.email
    con.query(`SELECT * FROM user WHERE email='${email}'`,
        (err, results) => {
            if (results.length < 0) {
                res.status(404).json({ message: 'l\'utilisateur est inconnu !' })
            } else {

                con.query(`DELETE FROM user WHERE email='${email}'`,
                    (err,) => {

                        res.status(201).json({ message: 'l\'utilisateur a été supprimé !' })
                    }
                )
            }
        });
};
exports.modifyUser = (req, res, next) => {
    const id = req.body.id;
    const email = req.body.email;
    const select = `SELECT * FROM user WHERE id = '${id}'`;
    con.query(select,
        (err, results) => {
            if (results.length == 0) {
                res.status(401).json({
                    message: 'Utilisateur non trouvé !'
                });
            } else {
                con.query(`SELECT * FROM user WHERE email = '${email}' and id <> '${id}'`,
                    (err, results) => {
                        if (results.length != 0) {
                            res.status(401).json({
                                message: 'Email déjà utilisé !'
                            });
                        } else {
                            bcrypt.hash(req.body.password, 10)
                                .then(cryptedPassword => {
                                    const updateUser = `UPDATE user SET nom = '${req.body.nom}', email = '${req.body.email}', password = '${cryptedPassword}' WHERE id = '${id}'`;
                                    con.query(updateUser,
                                        (err) => {
                                            if (err) {
                                                return res.status(400).json("erreur!");
                                            }
                                            return res.status(201).json({
                                                message: 'Votre compte a bien été modifié !'
                                            });
                                        }
                                    );
                                })
                                .catch(error => res.status(500).json({ error }));
                        }
                    });
            }
        });
};