const router = require('express').Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./notfi.db')


router.get('/notifications/list', (req, res) => {
    const sql = 'SELECT * FROM notifications;'
    db.run('CREATE TABLE IF NOT EXISTS notifications (id INTEGER PRIMARY KEY, message TEXT, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)');
    db.all(sql, (err, rows) => {
        let arr = []
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            arr.push(row)
        });
        res.send(arr)
    });
})


router.get('/notifications/number', (req, res) => {
    const sql = 'SELECT * FROM notifications;'
    db.all(sql, (err, rows) => {
        let arr = []
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            arr.push(row)
        });
        const length = arr.length
        res.json([{numOfNotfi: length}]);
    });
})

module.exports = router