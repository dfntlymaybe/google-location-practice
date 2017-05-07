var express = require('express');

var app = express();
var request = require('request');

app.use(express.static('public'));
app.use(express.static('node_modules'));

var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=ashdod&destinations=tel+aviv&key=AIzaSyDFvq-nVLHzNFaZx038s-Jbl19UgvzcNGQ';

//Sending HTML on first GET
app.get('', function (req, res) {
  console.log("New Client")
  res.sendFile(__dirname + "/index.html");

});

app.listen(process.env.PORT || '4000');
console.log("Server starts");