const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const bodyParser = require('body-parser')

const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLyout: 'main',
    helpers: {
        section : function(name, options) {
            if(!this._section) this._section = {}
            this._section[name] = options.fn(this)
            return null
        },
    },
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about', (req, res) => {
    
    res.render('about', {fortune: fortune.getFortune()})
})

app.get('/headers', (req,res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
})

app.use((req, res) => {
    ews.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log('express started' + `on ${port}` + 'press ctrl+c'))

