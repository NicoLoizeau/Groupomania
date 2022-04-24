const bodyParser = require('body-parser');
const con = require('../cluster');
const Publication = require('../models/publication');
const fs = require('fs');

exports.newPub = (req, res, next) => {
    const insert = `
    INSERT INTO publication 
    VALUES (
        NULL, 
        '${req.body.titre}',
        '${req.body.description}',
        '${req.body.image}',
        '${req.body.date}',
        '${req.body.user}'
        )
    `;
    con.query(insert, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json("erreur!");
        } else {
            return res.status(201).json({
                message: 'Votre publication a bien été créée !'
            })
        };

    })
}


exports.allPub = (req, res, next) => {
    const select = `
        SELECT 
            publication.titre, 
            publication.description, 
            publication.image, 
            date_format(publication.date, "%W %M %e %Y") as date, 
            user.nom 
        FROM publication 
            left join user on publication.user = user.id 
        ORDER BY date desc
        `;
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new Publication(item['id'], item['titre'], item['description'], item['image'], item['date'], item['nom']))
            })
        }
        res.status(200).json({ list })
    })
}

exports.onePub = (req, res, next) => {
    const idPub = (req.headers.id);
    const select = `
    SELECT 
        publication.titre, 
        publication.description, 
        publication.image, 
        date_format(publication.date, "%W %M %e %Y") as date, 
        user.nom 
    FROM publication 
        left join user on publication.user = user.id 
    WHERE publication.id = 5 
    ORDER BY date desc
    `; //${idPub} @ publication.id
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new Publication(item['id'], item['titre'], item['description'], item['image'], item['date'], item['nom']))
            })
        }
        res.status(200).json({ list })
    })
}

exports.delPub = (req, res, next) => {
    const idPub = (req.body.id);
    const select = `
    DELETE 
    FROM publication 
    WHERE id = ${idPub} 
    `;
    con.query(select, (error, result) => {
        if (error) throw error
    })
    res.status(201).json({ message: 'publication supprimée !' })
}

exports.myPub = (req, res, next) => {
    const user = (req.headers.id);
    const select = `
    SELECT 
        publication.titre, 
        publication.description, 
        publication.image, 
        date_format(publication.date, "%W %M %e %Y") as date, 
        user.nom 
    FROM publication 
        left join user on publication.user = user.id 
    WHERE user.id = 5 
    ORDER BY date DESC
    `; //${user}
    con.query(select, (error, result) => {
        if (error) throw error
        let list = []
        if (result) {
            result.forEach((item) => {
                list.push(new Publication(item['id'], item['titre'], item['description'], item['image'], item['date'], item['nom']))
            })
        }
        res.status(200).json({ list })
    })
}
