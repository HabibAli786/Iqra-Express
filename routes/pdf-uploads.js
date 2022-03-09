const router = require('express').Router()
const fs = require('fs')

router.get('/pdf/uploads', (req, res) => {
    const dir = `./pdf-files`

    fs.readdir(dir, (err, files) => {
        let fileList
        fileList = files
        res.render('pdf-uploads', {layout: false, list: fileList})
    })

    // res.render('pdf-uploads', {layout: false, list: fileList})
})

router.post('/pdf/uploads', (req, res) => {
    const pdf = req.files.pdfFile
    if(pdf.mimetype !== 'application/pdf') {
        res.send('Error: Check the file extension is .pdf')
        throw ('error while uploading the file');
    }

    pdf.mv(`pdf-files/` + pdf.name, (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log('success uploading of pdf')
        }
    })

    res.redirect('/pdf/uploads')
})

router.post('/pdf/files', (req, res) => {
    const file = (req.body.name)
    fs.unlink(`./pdf-files/${file}`, (err) => {
        if(err) console.log(err)
        console.log('success')
        res.redirect('back');
    })
})

module.exports = router