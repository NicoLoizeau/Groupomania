const bodyParser = require('body-parser');
const con = require('../cluster');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.list = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');
    const userId = decodedToken.userID;

    const select = `SELECT * FROM user WHERE id=${userId} `
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
    const regexMail = /^\w+([\._-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword = /^[a-zA-Z0-9]{8,50}$/;    //entre 8 et 50 alpha
    const email = req.body.email;
    let photo = null;

    if (req.files != undefined) {
        const file = req.files[0]
        photo = `${req.protocol}://${req.get('host')}/images/${file.filename}`;
    }
    con.query(`SELECT * FROM user WHERE email='${email}'`,
        (err, results) => {
            if (results.length > 0) {
                res.status(401).json({
                    message: 'Email déjà utilisé !'
                });
            } if (regexMail.test(email) && regexPassword.test(req.body.password)) {
                bcrypt.hash(req.body.password, 10)
                    .then(cryptedPassword => {
                        const newUser = `INSERT INTO user VALUES (NULL, '${req.body.nom}', '${email}', '${cryptedPassword}', '${photo}')`
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
            } else {
                return res.status(401).json({
                    message: 'l\'email ou le mot de passe ne respecte pas les conditions '
                });

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
                                token: jwt.sign({ userID: results[0].id },
                                    'RANDOM_SECRET_TOKEN',
                                    { expiresIn: '24h' })
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
exports.modify = (req, res, next) => {
    const regexPassword = /^[a-zA-Z0-9]{8,50}$/;    //entre 8 et 50 alpha
    const id = req.body.id;
    const email = req.body.email;

    if (req.files.length > 0) {
        const id = req.body.id;
        const email = req.body.email;
        const select = `SELECT * FROM user WHERE id = '${id}'`;
        const newphoto = `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`;
        const photo = con.query(`SELECT photo FROM user WHERE email = '${email}'`,
            (err, results) => {
                return results.photo
            })
        con.query(select,
            (err, results) => {
                if (results.length == 0) {
                    res.status(401).json({
                        message: 'Utilisateur non trouvé !'
                    });
                } if (newphoto != photo) {
                    console.log('modif photo')
                    con.query(`UPDATE user SET photo = '${newphoto}' WHERE id = '${id}'`,
                        (err) => {
                            if (err) {
                                console.log(err)
                                return res.status(400).json("erreur !");
                            }
                            return res.status(201).json({
                                message: 'Votre photo a bien été modifié !'
                            });
                        })
                }
            })
    } if (req.body.password != undefined && regexPassword.test(req.body.password)) {
        console.log(req.body.password, '1')
        bcrypt.hash(req.body.password, 10)
            .then(cryptedPassword => {
                console.log(cryptedPassword)
                console.log(id)
                con.query(`UPDATE user SET password = '${cryptedPassword}' WHERE id = '${id}'`,
                    (err) => {
                        if (err) {
                            console.log(err)
                            return res.status(400).json("erreur !");
                        }
                        return res.status(201).json({
                            message: 'Votre mot de passe a bien été modifié !'
                        });
                    }
                );
            })
            .catch(error => res.status(500).json({ error }));
    }
}