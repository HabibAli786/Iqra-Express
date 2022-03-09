const router = require('express').Router()
const sqlite3 = require('sqlite3')

// Require notifi databa
const db = new sqlite3.Database('./notfi.db')

// Render notifi page
router.get('/notifications/uploads', (req, res) => {
    const sql = 'SELECT * FROM notifications;'
    db.all(sql, (err, rows) => {
        let arr = []
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            arr.push(row)
        });
        arr.reverse()
        res.render('notfi-uploads', {layout: false, notfi: arr})
    });
})

// Delete a notification
router.post('/notifications/delete', (req, res) => {
    const id = req.body.notfi
    db.run(`DELETE FROM notifications WHERE id = ${id};`)
    res.redirect('back');
})

// Upload a notification
router.post('/notifications/message', (req, res) => {
    const message = req.body.message
    // console.log(id)
    db.run(`INSERT INTO notifications (message) VALUES("${message}");`)
    res.redirect('back');
})

module.exports = router