const fs = require("fs");
const http = require("http");
console.log("Hello");

// Blocking and Synchronous Way

const text = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(text);

const textOut = `This is What we know about fruit: ${text}.\nCreated on ${new Date()}`;
fs.writeFileSync("./txt/output.txt", textOut);

// Non Blocking and Asynchronous Way

const text1 = fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  console.log(data1);
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);
      fs.writeFile(
        "./txt/output.txt",
        `${data1}\n${data2}\n${data3}`,
        "utf-8",
        (err) => {
          console.log(err);
        }
      );
    });
  });
});

// err will be in boolean like true or false if errr then we can return from their.

console.log(__dirname);
