const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
  })

  app.listen(port)
  console.log('Server started at http://localhost:' + port)