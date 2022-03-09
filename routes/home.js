const router = require('express').Router()

// Home page of the admin account
router.get('/', (req, res) => {
    res.render('home', {layout: false})
})

// Iqra logo
router.get('/logo', (req, res) => {
    res.sendFile(`/Users/habib/Documents/Iqra-Express/public/iqra-logo.jpg`)
})

module.exports = router