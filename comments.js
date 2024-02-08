// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var comments = require('./comments.json');
var _ = require('underscore');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/api/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Add comment
app.post('/api/comments', function(req, res) {
  var newComment = {
    id: Date.now(),
  };
    _.extend(newComment, req.body);
    comments.push(newComment);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.log(err);
      }
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
}
);