const http = require("http");
const fs = require("fs");
let data = fs.readFileSync("./dev-data/data.json", "utf-8");

const server = http.createServer((req, res) => {
  // request and response
  let path = req.url;
  if (path === "/harsh") {
    //   send header before response IMPORATNT!!!!
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end("<h1>This is Harsh Page!!!</h1>");
  } else if (path === "/products") {
    res.end("This is Products Page!!!");
  } else if (path === "/api") {
    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end("<h2>API Page</h2>");
    res.end(data);
  } else res.end("Hello From the Server!");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
