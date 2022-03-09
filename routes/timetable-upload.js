const router = require('express').Router()

router.get('/timetable/uploads', (req, res) => {
    res.render('timetable-uploads', {layout: false})
})

router.post('/timetable/uploads', (req, res) => {
    const timetable = req.files.timetable
    const fileName = req.files.timetable.name
    if(fileName !== 'currentTimetable.csv') {
        res.send('Error: Name of the file should be currentTimetable, please try again and uploading the current file and check the file extension is .csv')
        throw ('error while uploading the file');
    }

    timetable.mv(`public/` + timetable.name, (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log('successful upload of csv file')
        }
    })
    res.redirect('/timetable/uploads')
})
module.exports = router