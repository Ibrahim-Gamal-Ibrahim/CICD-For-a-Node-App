require('dotenv').config();

const express = require('express');
const auth = require('basic-auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Middleware for Basic Auth
const basicAuthMiddleware = (req, res, next) => {
    const user = auth(req);

    if (!user || user.name !== process.env.USERNAME || user.pass !== process.env.PASSWORD) {
        res.set('WWW-Authenticate', 'Basic realm="example"');
        return res.status(401).send('Authentication required.');
    }

    next();
};

// Secret route
app.get('/secret', basicAuthMiddleware, (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

