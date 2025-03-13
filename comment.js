//create web server
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

//create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
       name:req.body.name,
       comment:req.body.comment
   };
   console.log(response);
   fs.appendFile('output.json', JSON.stringify(response), function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

   console.log("comment received");
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Comment app listening at http://%s:%s", host, port)
})
//end of comment.js