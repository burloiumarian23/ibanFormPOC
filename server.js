const port 	  = 8080
const express = require('express')
const app 	  = express()
const bodyParser = require('body-parser')
const path = require('path')

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )


app.use( '/app/js', express.static('js'))
// app.use( '/app/@lion', express.static( __dirname + '/node_modules/@lion'))
// app.use( '/app/lit-element', express.static( __dirname  + '/node_modules/lit-element'))

// // app.use( '/lit-html/', express.static('node_modules/lit-html'))
// app.use( '/app/lit-html', express.static( __dirname  + '/node_modules/lit-html'))
//app.use( 'lib', express.static( __dirname  + '/node_modules/lit-html/lib'))

app.use( '/app/bootstrap', express.static( path.join( __dirname, '/node_modules/bootstrap') ))
app.use( '/app'   , express.static('static') )

app.listen( port , () => {
   console.log(`Server listening on port ${port}`)
})