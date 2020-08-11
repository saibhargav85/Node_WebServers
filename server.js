const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

//app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'about', layoutDir: __dirname + '\\views' }));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
//app.set('views', path.join(__dirname, '\\views\\partials'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err)
            console.log('unable to add log');
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// })

app.use(express.static(__dirname + '\\public'));


app.get('/', (req, res) => {
    res.render('home.hbs', {
        name: 'Sai',
        pageTitle: 'Home Page'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        name: 'Sai',
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/help', (req, res) => {
    res.render('help.html')
});

app.listen(port, () => {
    console.log(`app is running at port ${port} on:`)
    console.log(`http://localhost:${port}`)
}); 