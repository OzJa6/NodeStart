exports.home = (req, res) => {
    res.render('home')
}

exports.about = (req, res) => {
    res.render('about', { fortune: fortune.getFortune() })
}

exports.headers = (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
    res.send(headers.join('\n'))
}

exports.NotFound = (req, res) => {
    ews.status(404)
    res.render('404')
}

exports.ServerError = (err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
}
//
// this handlers for submitted forms
//
exports.newsletterSignup = (req, res) => {
    res.render('newsletter', { csrf: 'token CSRF' });
}

exports.newsletterSignupProcess = (req, res) => {
    console.log('form from link:' + req.query.form)
    console.log('token:' + req.body._csrf)
    console.log('name:' + req.body.name)
    console.log('email:' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}
//
// For fetch
//
exports.newsletter = (req, res) => {
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}

exports.api = {
    newsletterSignup: (req, res) => {
        console.log('token: ' + req.body._csrf)
        console.log('name: ' + req.body.name)
        console.log('email: ' + req.body.email)
        res.send({ result: 'success' })
    }

}