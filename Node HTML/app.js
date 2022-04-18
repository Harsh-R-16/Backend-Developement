let http = require("http");
let fs = require("fs");

let home = fs.readFileSync("./home.html", "utf-8");
let index = fs.readFileSync("./index.html", "utf-8");
let json = fs.readFileSync("./data.json", "utf-8");
let server = http.createServer((req, res, next) => {
  let path = req.url;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  if (path === "/") {
    res.end(home);
  } else if (path === "/json") {
    res.end(json);
  } else if (path === "/nodefarm") {
    index.replace("temp", JSON.parse(json));
    res.end(index);
  } else {
    res.end("Nothing ");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
