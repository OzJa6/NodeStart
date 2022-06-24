const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')
const multiparty = require('multiparty')

const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLyout: 'main',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', weatherMiddleware, handlers.home)

app.get('/about', handlers.about)

app.get('/headers', handlers.headers)

app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/contest/vacation-photo', handlers.vacationPhoto)
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
    const form = new multiparty.Form()
    form.parse(req, (err, fields, files) => {
      if(err) return handlers.ServerError(req, res, err.message)
      handlers.api.vacationPhotoContest(req, res, fields, files)
    })
})

// app.post('/contest/vacation-photo/:year/:month', (req, res) => {
//     const from = new multiparty.Form()
//     from.parse(req, (err, fields, files) => {
//         if(err) return handlers.ServerError
//         handlers.vacationPhotoContestProcess(req, res, fields, files)
//     })
// })


app.use(handlers.NotFound)

app.use(handlers.ServerError)

app.listen(port, () => console.log('express started' + `on ${port}` + 'press ctrl+c'))

