const router = require('express').Router()
const csvtojson = require('csvtojson')

  // Current day from csv file in array
  router.get('/api/timetable', (req, res) => {
    var dateobj = new Date();
    const day = dateobj.getDate()
    csvtojson().fromFile(`public/currentTimetable.csv`).then(source => {

      let current = []
    
    source.forEach(element => {
      if(element.Date == day) current.push(
          {id: 1, salah: "Fajr", startTime: element.Start, jamaat: element.Fajr2, month: element.Month, year: element.Year, hijriDay: element.HijriDay, Cmonth: element.Cmonth, Cyear: element.Cyear, date: element.Date},
          {id: 2, salah: "Sunrise", startTime: element.Sunrise, jamaat: ""},
          {id: 3, salah: "Zuhr", startTime: element.Zuhr, jamaat: element.Zuhr2},
          {id: 4, salah: "Asr", startTime: element.Asr, jamaat: element.Asr2},
          {id: 5, salah: "Maghrib", startTime: element.Magrib, jamaat: element.Magrib2},
          {id: 6, salah: "Isha", startTime: element.Isha, jamaat: element.Isha2},
        )
    });
    res.send(current)
    })
  });
  
  // Set of notifications for demo
  // Can be deleted
  router.get('/api/notifications', (req, res) => {
    const notifications = [
      {id: 1, title: "Painting the masjid after isha", time: "1"},
      {id: 2, title: "Football at 3PM", time: "2"},
      {id: 3, title: "Cricket at 4PM", time: "3"},
      {id: 4, title: "Jummah speech moved to 12PM", time: "30"}
    ]
  
    res.json(notifications)
  })
  
  // Set date for demo
  // Can be deleted
  router.get('/api/date', (req, res) => {
    const date = [
      {id: 1, day: 30, month: "Jamada al-thani", year: 1441}
    ]
  
    res.json(date)
  })

module.exports = router