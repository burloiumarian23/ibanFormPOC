const port 	  = 8080
const express = require('express')
const app 	  = express()
const bodyParser = require('body-parser')

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

app.use( '/app'   , express.static('static') )
app.use( '/app/js', express.static('js'))

app.listen( port , () => {
   console.log(`Server listening on port ${port}`)
})