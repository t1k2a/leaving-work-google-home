require("dotenv").config();

const HomePlayer = require("google-home-player");
var googleHome = new HomePlayer(process.env.IP, "ja");
const http = require("http");
const PORT = 3000;

http
  .createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api") {
      let body = "";
      req.on("data", (chunk) => {
        console.log(chunk);
        body += chunk.toString();
      });

      req.on("end", () => {
        const text = JSON.parse(body);
        console.log("Recuivved data:", text);

        googleHome.say(text);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "Data received", receivedData: text })
        );
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  })
  .listen(PORT, () => {
    console.log(`Server is runnning on port ${PORT}`);
  });
