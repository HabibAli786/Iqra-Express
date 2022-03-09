const router = require('express').Router()
const fs = require('fs')

// Sends the number of files in the pdf directory
router.get('/download', (req, res) => {
  const dir = `./pdf-files`
  fs.readdir(dir, (err, files) => {
    let welcome
    welcome = files.length
    // console.log(welcome)
    res.json([{numFiles: welcome}]);
  })
})

// Handles requests for downloading a specific pdf
router.get('/download/:id', (req, res) => {
  const file = `./pdf-files/${req.params.id}`;
  res.download(file);
})

// Returns number of files in pdf folder
router.get('/download/filename/:id', (req, res) => {
  const dir = `./pdf-files`

  fs.readdir(dir, (err, files) => {
    let fileList
    fileList = files
    // console.log(fileList)
    // if(err) throw new Error('An error downloading the file...')
    res.json([fileList]);
  })
})

// Hosts the image being displayed to each card in slides page
router.get('/download/pdf/image', (req, res) => {
  res.sendFile(`/Users/habib/Documents/Iqra-Express/public/pdf-logo.jpg`)
})


module.exports = router