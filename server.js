/**
 * Created by rysade on 3/11/17.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    "use strict";
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     "use strict";
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public/'));

hbs.registerHelper('getCurrentYear', () => {
    "use strict";
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    "use strict";
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    "use strict";
    // res.send('<h1>Hello Express.</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome to this site'
    })
});

app.get('/about', (req, res) => {
    "use strict";
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    "use strict";
    res.send({
        errorMessage: 'Error handling request'
    })
});

app.listen(port, () => {
    "use strict";
    console.log(`Server is up on port ${port}`);
});