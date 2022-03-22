const mysql = require('mysql2');

var con = mysql.createConnection({
    host: 'localhost', user: 'root', password: 'LesMonstres<3', database: 'groupomaniaDb'
})
con.connect((error) => {
    if (error) throw error
    console.log('connecté !')
})
module.exports = con