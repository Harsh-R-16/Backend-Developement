const http = require("http");
const fs = require("fs");
const slugify = require("slugify");

let home = fs.readFileSync("./home.html", "utf-8");
let index = fs.readFileSync("./index.html", "utf-8");
let fruit = fs.readFileSync("./fruit.html", "utf-8");
let singleFruit = fs.readFileSync("./singleFruit.html", "utf-8");
let json = fs.readFileSync("./data.json", "utf-8");
let data = JSON.parse(json);
let slugs = data.map((i) => slugify(i.productName, { lower: true }));
let htmlText = "";
for (let i = 0; i < data.length; i++) {
  let { id, productName, image, quantity, price, organic } = data[i];
  htmlText += `<div>
            <p class="img">${image}${image}</p>
            <h2>${productName}</h2>
            <p class="oraganic">${organic ? "Oraganic" : ""}</p>
            <p class="quantity">${quantity} per 📦</p>
            <p class="price">${price}€</p>
            <a class="link" href="/nodefarm/${id}">
                Detail <span>👉</span>
            </a>
        </div>`;
}

let server = http.createServer((req, res) => {
  let path = req.url;
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  if (path === "/") {
    res.end(home);
  } else if (path === "/json") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(json);
  } else if (path === "/nodefarm") {
    res.end(index.replace("${output}", htmlText));
  } else if (path === "/fruit") {
    res.end(fruit);
  } else if (path.includes("nodefarm")) {
    let index = path.split("/")[2];
    console.log(typeof index);
    let {
      productName,
      image,
      from,
      nutrients,
      quantity,
      price,
      organic,
      description,
    } = data[+index];
    let str = singleFruit;
    str = str.replace(
      "${output}",
      `<figure class="product">
            <div class=${organic && "product__organic"}>
                <h5>${organic ? "Organic" : ""}</h5>
            </div>
            <a href="/nodefarm" class="product__back">
                <span class="emoji-left">👈</span>Back
            </a>
            <div class="product__hero">
                <span class="product__emoji product__emoji--1">${image}</span>
                <span class="product__emoji product__emoji--2">${image}</span>
                <span class="product__emoji product__emoji--3">${image}</span>
                <span class="product__emoji product__emoji--4">${image}</span>
                <span class="product__emoji product__emoji--5">${image}</span>
                <span class="product__emoji product__emoji--6">${image}</span>
                <span class="product__emoji product__emoji--7">${image}</span>
                <span class="product__emoji product__emoji--8">${image}</span>
                <span class="product__emoji product__emoji--9">${image}</span>
            </div>
            <h2 class="product__name">${productName}</h2>
            <div class="product__details">
                <p><span class="emoji-left">🌍</span> From ${from}</p>
                <p><span class="emoji-left">❤️</span> ${nutrients}</p>
                <p><span class="emoji-left">📦</span> ${quantity}</p>
                <p><span class="emoji-left">🏷</span> ${price}€</p>
            </div>

            <a href="#" class="product__link">
                <span class="emoji-left">🛒</span>
                <span>Add to shopping card (${price}€)</span>
            </a>

            <p class="product__description">
                ${description}
            </p>
        </figure>`
    );
    res.end(str);
  } else {
    res.end(`<h1>Nothing found on this Route ${path}</h1>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
