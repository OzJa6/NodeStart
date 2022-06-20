const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLyout: 'main',
}))

app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

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

