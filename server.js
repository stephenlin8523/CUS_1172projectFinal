const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('resources'));
app.set('view engine', 'pug');

app.use(session({
    secret: 'verysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }  // Set true in production with HTTPS
}));
app.get('/', (req, res) => {
    // Redirect to the login page as a simple landing action
    res.redirect('/auth/login');
    
});

// Import routes
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');

app.use('/auth', authRoutes);
app.use('/video', videoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

