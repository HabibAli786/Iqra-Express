const router = require('express').Router()
const fs = require('fs')
const sqlite3 = require('sqlite3')

// Require Database for Imam page
const db = new sqlite3.Database('./imam.db')

// Render the admin imam page
router.get('/ask-imam/uploads', (req, res) => {
    res.render('imam-uploads', {layout: false})
})

// Send image of the imam from the server
router.get('/ask-imam/image', (req, res) => {
    res.sendFile(`/Users/habib/Documents/Iqra-Express/public/imam-pp.jpg`)
})

// Upload imam image on server
router.post('/ask-imam/image', (req, res) => {
    const file = req.files.picture
    if(file.name !== 'imam-pp.jpg') throw new Error('Please ensure the file called imam-pp and has the jpg file format')

    file.mv(`public/` + file.name, (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log('success uploading of image for imam pp')
        }
    })
})

// Update Imam info
router.post('/ask-imam/name', (req, res) => {
    const name = req.body.name
    const desc = req.body.desc
    const email = req.body.email
    const number = req.body.number

    db.run(`UPDATE imam SET name="${name}", desc="${desc}", 
        email="${email}", number="${number}" WHERE id=1;`)

    res.redirect('back')

})

// Send data of imam profile
router.get('/ask-imam/data', (req, res) => {
    const sql = 'SELECT * FROM imam;'
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

module.exports = router