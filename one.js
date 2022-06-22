const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')
const bodyParser = require('body-parser')
const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')

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




app.use(handlers.NotFound)

app.use(handlers.ServerError)

app.listen(port, () => console.log('express started' + `on ${port}` + 'press ctrl+c'))

