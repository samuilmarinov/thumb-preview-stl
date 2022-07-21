// index.js
var StlThumbnailer = require('node-stl-thumbnailer');
var app = require("express")();

app.get('/thumbnailer', function(req, res, next) {
    var thumbnailer = new StlThumbnailer({
        url: req.query.url,           // url OR filePath must be supplied, but not both
        //filePath: "...",            // load file from filesystem
        requestThumbnails: [
            {
                width: 500,
                height: 500,
            }
        ]   
    })
    .then(function(thumbnails){
          // thumbnails is an array (in matching order to your requests) of Canvas objects
          // you can write them to disk, return them to web users, etc
          thumbnails[0].toBuffer(function(err, buf){      
          res.contentType('image/png');
          res.send(buf)
        })
    })
    .catch(function(err){
        res.status(500);
        res.send("Error thumbnailing: "+err);
    });
});

app.listen(3000, function () {
  console.log('Listening on port 3000\n')
});