//Create web server
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const comments = require('./comments');

app.use(cors());
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments.getComments());
});

// Add a comment
app.post('/comments', (req, res) => {
    const { name, comment } = req.body;
    comments.addComment(name, comment);
    res.json(comments.getComments());
});

// Start server
const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});