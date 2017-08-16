var express = require("express")
var app = express()
var useragent = require("express-useragent")
var requestLanguage = require('express-request-language');

app.set('port', process.env.PORT || 5000)
app.use(express.static(__dirname + "/public"))

app.use(requestLanguage({
  languages: ['en-US']
}));


app.get("/api", (req, res) =>{
  var source = req.headers['user-agent']
  var ua = useragent.parse(source)
  var obj = {"ipaddress": req.ip.replace("::ffff:", ''), "language":req.language, "software": ua.source}
  res.writeHead(200, {"Content-Type":"application/json"})
  res.end(JSON.stringify(obj))
})

app.listen(app.get("port"), function() {
  console.log("Node app is running at http://localhost:" + app.get('port'))
})
//
